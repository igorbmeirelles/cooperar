"use client";

import { useState } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable } from "./_components/data-table";
import { supplyControlColumns } from "./_components/columns";
import { IControl, Control, ISupply, Supply } from "./_models";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "./_components/status";
import { Header } from "./_components/header";
import { useSupplies } from "./_context";

const schema = z.object({
  id: z.string().optional(),
  ageGroup: z.object({
    key: z.string(),
    name: z.string(),
    ageGroup: z.string(),
  }),
  farming: z.object({
    id: z.string(),
    farming: z.string(),
    pre_school: z.number().positive(),
    elementary_school: z.number().positive(),
    high_school: z.number().positive(),
    adults_and_elderly: z.number().positive(),
    manual: z.string(),
  }),
  numberOfPeople: z.coerce
    .number()
    .positive("Número de pessoas deve ser positivo"),
  plannedDays: z.coerce
    .number()
    .positive("Número de dias planejados deve ser positivo"),
  date: z.coerce.date().optional(),
  institution: z.object(
    {
      name: z.string(),
      email: z.string(),
      phone: z.string(),
    },
    { message: "Instituição obrigatória" }
  ),
  supplied: z.coerce
    .number()
    .nonnegative("Quantidade fornecida deve ser positiva")
    .optional(),
});

interface IProps {
  supply?: ISupply;
}

export function ControlPage({ supply }: IProps) {
  const form = useForm<IControl>({
    defaultValues: new Control(
      undefined,
      undefined,
      0,
      0,
      null,
      undefined,
      0,
      undefined
    ),
    resolver: zodResolver(schema),
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
    form.reset(Control.create(aControl));

    setOpen(true);
  };

  const { writeSupply, editSupply } = useSupplies();

  const saveControls = async () => {
    if (supply) {
      await editSupply(new Supply(someControls, supply.id, supply.date));
      return;
    }

    await writeSupply(new Supply(someControls, undefined, new Date()));

    setSomeControls([]);
  };

  return (
    <GlassCard className="mb-8 overflow-auto">
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
