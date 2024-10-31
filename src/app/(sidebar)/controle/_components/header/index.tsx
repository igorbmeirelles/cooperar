import { UseFormReturn } from "react-hook-form";
import { Control, IControl } from "../../_models";
import { SaveButton } from "../button/save";
import { Dialog } from "../dialog";
import { SetStateAction, useCallback, useMemo } from "react";
import { AgeGroupControl, ControlForm, IControlForm } from "../..";
import { ageGroup, TAgeGroupKey } from "@/app/_lib/constants";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
  open: boolean;
  setOpen: (value: boolean) => void;
  someControls: IControl[];
  setSomeControls: (value: SetStateAction<IControl[]>) => void;
  saveControls: () => void;
}

export function Header({
  form,
  open,
  setOpen,
  setSomeControls,
  someControls,
  saveControls,
}: IProps) {
  const ageControls: TAgeGroupKey[] = useMemo(
    () => [
      "pre_school",
      "elementary_school",
      "high_school",
      "adults_and_elderly",
    ],
    []
  );

  const updateControls = useCallback(
    (aFormData: IControlForm) => {
      const matches = (control: IControl) =>
        control.institution?.email === aFormData.institution?.email &&
        control.farming?.farming === aFormData.farming?.farming;
      debugger;
      let newControls: IControl[] = someControls;

      ageControls.forEach((ageControl) => {
        const ageGroupControl = aFormData[ageControl];

        const existentControl = newControls.find(
          (control) =>
            matches(control) &&
            control.ageGroup?.key === ageGroupControl.ageGroup.key
        );

        if (!ageGroupControl.active && existentControl) {
          newControls = newControls.filter(
            (control) =>
              !(
                matches(control) &&
                control.ageGroup?.key === ageGroupControl.ageGroup.key
              )
          );

          return;
        }

        if (existentControl) {
          newControls = newControls.map((control) => {
            if (
              matches(control) &&
              control.ageGroup?.key === ageGroupControl.ageGroup.key
            ) {
              return new Control(
                control.ageGroup,
                aFormData.farming,
                ageGroupControl.numberOfPeople,
                ageGroupControl.plannedDays,
                ageGroupControl.date ?? null,
                aFormData.institution,
                ageGroupControl.supplied,
                control.id
              );
            }

            return control;
          });

          return;
        }

        if (ageGroupControl.active)
          newControls.push(
            new Control(
              ageGroupControl.ageGroup,
              aFormData.farming,
              ageGroupControl.numberOfPeople,
              ageGroupControl.plannedDays,
              ageGroupControl.date ?? null,
              aFormData.institution,
              ageGroupControl.supplied,
              undefined
            )
          );
      });
      setSomeControls(newControls);

      setOpen(!open);
    },
    [someControls, setSomeControls, open, setOpen, ageControls]
  );

  const onSubmit = (aFormData: IControlForm) => {
    const matches = (control: IControl) =>
      control.institution?.email === aFormData.institution?.email &&
      control.farming?.farming === aFormData.farming?.farming;

    const existingControls = someControls.filter(matches);

    if (existingControls.length > 0) {
      updateControls(aFormData);
      return;
    }

    const newControls: IControl[] = ageControls
      .map((ageControl) => {
        const ageGroupControl = aFormData[ageControl];

        if (!ageGroupControl.active) return undefined;
        return new Control(
          ageGroupControl.ageGroup,
          aFormData.farming,
          ageGroupControl.numberOfPeople,
          ageGroupControl.plannedDays,
          ageGroupControl.date ?? null,
          aFormData.institution,
          ageGroupControl.supplied,
          undefined
        );
      })
      .filter((control) => control) as IControl[];

    setSomeControls((prev) => [...prev, ...newControls]);

    form.reset(
      new ControlForm(
        undefined,
        undefined,
        new AgeGroupControl(ageGroup.pre_school, 0, undefined, 0, 0),
        new AgeGroupControl(ageGroup.elementary_school, 0, undefined, 0, 0),
        new AgeGroupControl(ageGroup.high_school, 0, undefined, 0, 0),
        new AgeGroupControl(ageGroup.adults_and_elderly, 0, undefined, 0, 0)
      )
    );

    setOpen(!open);
  };

  const handleOpenChange = () => {
    if (!open) {
      form.reset(
        new ControlForm(
          undefined,
          undefined,
          new AgeGroupControl(ageGroup.pre_school, 0, undefined, 0, 0),
          new AgeGroupControl(ageGroup.elementary_school, 0, undefined, 0, 0),
          new AgeGroupControl(ageGroup.high_school, 0, undefined, 0, 0),
          new AgeGroupControl(ageGroup.adults_and_elderly, 0, undefined, 0, 0)
        )
      );
    }

    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-between flex-wrap">
      <h1 className="text-medium font-medium">Controle de fornecimento</h1>
      <div className="flex items-center gap-2">
        <Dialog
          open={open}
          handleOpenChange={handleOpenChange}
          form={form}
          onSubmit={onSubmit}
        />
        <SaveButton onClick={saveControls} />
      </div>
    </div>
  );
}
