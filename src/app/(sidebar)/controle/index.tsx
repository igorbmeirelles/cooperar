"use client";

import { useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable } from "./_components/data-table";
import { supplyControlColumns } from "./_components/columns";
import { IControl, ISupply, Supply } from "./_models";

import { useForm } from "react-hook-form";
import { Status } from "./_components/status";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "./_components/header";
import { useSupplies } from "./_context";
import { IAgeGroup, ageGroup } from "@/app/_lib/constants";
import { IFarming } from "../culturas/_models";
import { IInstitution } from "../instituicoes/_context/models/Institution";

import * as yup from "yup";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  farming: yup
    .object()
    .shape({
      id: yup.string().required(),
      farming: yup.string().required(),
      pre_school: yup.number().positive().required(),
      elementary_school: yup.number().positive().required(),
      high_school: yup.number().positive().required(),
      adults_and_elderly: yup.number().positive().required(),
      manual: yup.string(),
    })
    .required("Cultura obrigatória")
    .default(undefined),
  institution: yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().required(),
      phone: yup.string().required(),
    })
    .required("Instituição obrigatória")
    .default(undefined),
  pre_school: yup.object().shape({
    ageGroup: yup
      .object()
      .shape({
        name: yup.string().required(),
        key: yup.string().required(),
        ageGroup: yup.string().required(),
      })
      .required(),
    numberOfPeople: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    date: yup.date().optional(),
    supplied: yup
      .number()
      .optional()
      .when("active", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.min(0, "Deve ser um valor positivo"),
      }),
    plannedDays: yup
      .number()

      .when("active", {
        is: true,
        then: (schema) =>
          schema
            .positive("Deve ser um valor positivo")
            .required("Campo obrigatório"),
      }),
    active: yup.boolean().default(false),
  }),
  elementary_school: yup.object().shape({
    ageGroup: yup
      .object()
      .shape({
        name: yup.string().required(),
        key: yup.string().required(),
        ageGroup: yup.string().required(),
      })
      .required(),
    numberOfPeople: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    date: yup.date().optional(),
    supplied: yup
      .number()
      .optional()
      .when("active", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.min(0, "Deve ser um valor positivo"),
      }),
    plannedDays: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    active: yup.boolean().default(false),
  }),
  high_school: yup.object().shape({
    ageGroup: yup
      .object()
      .shape({
        name: yup.string().required(),
        key: yup.string().required(),
        ageGroup: yup.string().required(),
      })
      .required(),
    numberOfPeople: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    date: yup.date().optional(),
    supplied: yup
      .number()
      .optional()
      .when("active", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.min(0, "Deve ser um valor positivo"),
      }),
    plannedDays: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    active: yup.boolean().default(false),
  }),
  adults_and_elderly: yup.object().shape({
    ageGroup: yup
      .object()
      .shape({
        name: yup.string().required(),
        key: yup.string().required(),
        ageGroup: yup.string().required(),
      })
      .required(),
    numberOfPeople: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    date: yup.date().optional(),
    supplied: yup
      .number()
      .optional()
      .when("active", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.min(0, "Deve ser um valor positivo"),
      }),
    plannedDays: yup.number().when("active", {
      is: (val: boolean) => val === true,
      then: (schema) =>
        schema
          .positive("Deve ser um valor positivo")
          .required("Campo obrigatório"),
    }),
    active: yup.boolean().default(false),
  }),
});

interface IProps {
  supply?: ISupply;
}

export interface IControlForm {
  farming: IFarming | undefined;
  institution: IInstitution | undefined;
  pre_school: AgeGroupControl;
  elementary_school: AgeGroupControl;
  high_school: AgeGroupControl;
  adults_and_elderly: AgeGroupControl;
}

export class ControlForm implements IControlForm {
  constructor(
    public farming: IFarming | undefined,
    public institution: IInstitution | undefined,
    public pre_school: AgeGroupControl,
    public elementary_school: AgeGroupControl,
    public high_school: AgeGroupControl,
    public adults_and_elderly: AgeGroupControl
  ) {}
}

export class AgeGroupControl {
  constructor(
    public ageGroup: IAgeGroup,
    public numberOfPeople: number,
    public date: Date | undefined,
    public supplied: number,
    public plannedDays: number,
    public active: boolean = false
  ) {
    this.ageGroup = ageGroup;
    this.numberOfPeople = numberOfPeople;
    this.date = date;
    this.supplied = supplied;
    this.plannedDays = plannedDays;
    this.active = active;
  }
}

export function ControlPage({ supply }: IProps) {
  const form = useForm<IControlForm>({
    defaultValues: new ControlForm(
      undefined,
      undefined,
      new AgeGroupControl(ageGroup.pre_school, 0, undefined, 0, 0),
      new AgeGroupControl(ageGroup.elementary_school, 0, undefined, 0, 0),
      new AgeGroupControl(ageGroup.high_school, 0, undefined, 0, 0),
      new AgeGroupControl(ageGroup.adults_and_elderly, 0, undefined, 0, 0)
    ),
    resolver: yupResolver(schema) as any,
  });

  const [someControls, setSomeControls] = useState<IControl[]>(
    supply?.controls || []
  );

  const onDeleteRequest = (aControl: IControl) => {
    setSomeControls((prev) =>
      prev.filter((control) => control.id !== aControl.id)
    );
  };

  const [open, setOpen] = useState(false);

  const onUpdateRequest = (aControl: IControl) => {
    const controls = someControls.filter(
      (control) =>
        control.institution?.email === aControl.institution?.email &&
        control.farming?.farming === aControl.farming?.farming
    );
    const pre_school_control = controls.find(
      (control) => control.ageGroup?.key === "pre_school"
    );

    const elementary_school_control = controls.find(
      (control) => control.ageGroup?.key === "elementary_school"
    );

    const high_school_control = controls.find(
      (control) => control.ageGroup?.key === "high_school"
    );

    const adults_and_elderly_control = controls.find(
      (control) => control.ageGroup?.key === "adults_and_elderly"
    );

    form.reset(
      new ControlForm(
        aControl.farming,
        aControl.institution,
        pre_school_control
          ? new AgeGroupControl(
              ageGroup.pre_school,
              pre_school_control?.numberOfPeople,
              pre_school_control?.date ?? undefined,
              pre_school_control?.supplied,
              pre_school_control?.plannedDays,
              true
            )
          : new AgeGroupControl(ageGroup.pre_school, 0, undefined, 0, 0),
        elementary_school_control
          ? new AgeGroupControl(
              ageGroup.elementary_school,
              elementary_school_control?.numberOfPeople,
              elementary_school_control?.date ?? undefined,
              elementary_school_control?.supplied,
              elementary_school_control?.plannedDays,
              true
            )
          : new AgeGroupControl(ageGroup.elementary_school, 0, undefined, 0, 0),
        high_school_control
          ? new AgeGroupControl(
              ageGroup.high_school,
              high_school_control?.numberOfPeople,
              high_school_control?.date ?? undefined,
              high_school_control?.supplied,
              high_school_control?.plannedDays,
              true
            )
          : new AgeGroupControl(ageGroup.high_school, 0, undefined, 0, 0),
        adults_and_elderly_control
          ? new AgeGroupControl(
              ageGroup.adults_and_elderly,
              adults_and_elderly_control?.numberOfPeople,
              adults_and_elderly_control?.date ?? undefined,
              adults_and_elderly_control?.supplied,
              adults_and_elderly_control?.plannedDays,
              true
            )
          : new AgeGroupControl(ageGroup.adults_and_elderly, 0, undefined, 0, 0)
      )
    );

    setOpen(true);
  };

  const { writeSupply, editSupply } = useSupplies();

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "Controle salvo/atualizado com sucesso!",
    description: "O controle foi salvo/atualizado com sucesso!",
  });

  const { push } = useRouter();

  const saveControls = async () => {
    try {
      if (someControls.length === 0)
        return setAlert((prev) => ({
          ...prev,
          title: "Não foi possível salvar controle",
          description:
            "Para que seja possível salvar deve haver ao menos 1 controle.",
          isOpen: true,
        }));

      if (supply) {
        await editSupply(new Supply(someControls, supply.id, supply.date));

        return setAlert((prev) => ({
          ...prev,
          isOpen: true,
          title: "Controle salvo/atualizado com sucesso!",
          description: "O controle foi salvo/atualizado com sucesso!",
        }));
      }

      const newSupply = new Supply(someControls, undefined, new Date());

      await writeSupply(newSupply);

      setAlert((prev) => ({
        ...prev,
        isOpen: true,
        title: "Controle salvo/atualizado com sucesso!",
        description: "O controle foi salvo/atualizado com sucesso!",
      }));

      setSomeControls([]);

      newSupply.id && push(`/controle/${newSupply.id}`);
    } catch (ex) {
      console.error(ex);
      setAlert((prev) => ({
        ...prev,
        isOpen: true,
        title: "Erro ao salvar/atualizar controle",
        description:
          "Ocorreu um erro ao salvar/atualizar controle, tente novamente mais tarde.",
      }));
    }
  };

  return (
    <GlassCard className="mb-8 overflow-auto">
      <Alert
        isOpen={alert.isOpen}
        description={alert.description}
        title={alert.title}
        onChange={() =>
          setAlert((prev) => ({ ...prev, isOpen: !alert.isOpen }))
        }
      />

      <Header
        open={open}
        setOpen={setOpen}
        form={form}
        saveControls={saveControls}
        someControls={someControls}
        setSomeControls={setSomeControls}
      />

      <Status someControls={someControls} />

      <DataTable
        columns={supplyControlColumns({
          onDelete: onDeleteRequest,
          onUpdate: onUpdateRequest,
        })}
        data={someControls}
      />
    </GlassCard>
  );
}
