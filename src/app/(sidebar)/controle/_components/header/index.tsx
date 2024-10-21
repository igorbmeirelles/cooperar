import { UseFormReturn } from "react-hook-form";
import { Control, IControl } from "../../_models";
import { SaveButton } from "../button/save";
import { Dialog } from "../dialog";
import { SetStateAction } from "react";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
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
  const onSubmit = (aFormData: IControl) => {
    if (someControls.some((control) => control.id === aFormData.id)) {
      setSomeControls((prev) =>
        prev.map((control) =>
          control.id === aFormData.id ? Control.create(aFormData) : control
        )
      );

      setOpen(!open);

      return;
    }

    setSomeControls((prev) => [...prev, Control.create(aFormData)]);

    form.reset(
      new Control(
        undefined,
        undefined,
        0,
        0,
        null,
        undefined,
        0,
        undefined
      )
    );

    setOpen(!open);
  };

  const handleOpenChange = () => {
    setOpen(!open);

    if (!open) {
      form.reset(
        new Control(
          undefined,
          undefined,
          0,
          0,
          null,
          undefined,
          0,
          undefined
        )
      );
    }
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
