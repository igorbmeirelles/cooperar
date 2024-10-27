"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable } from "./_components/data-table";
import { farmingsColumns } from "./_components/columns";
import { Header } from "./_components/header";
import { useFarmings } from "./_context";
import { IFarming } from "./_models";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IFarmingForm } from "./_components/dialog";

const schema = z.object({
  farming: z.string().min(3, "Cultura deve ter no mínimo 3 caracteres"),
  pre_school: z.coerce.number().positive("Deve ser um número positivo"),
  elementary_school: z.coerce.number().positive("Deve ser um número positivo"),
  high_school: z.coerce.number().positive("Deve ser um número positivo"),
  adults_and_elderly: z.coerce.number().positive("Deve ser um número positivo"),
  manual: z.string(),
});

export default function PerCapta() {
  const form = useForm<IFarmingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      farming: "",
      pre_school: 0,
      elementary_school: 0,
      high_school: 0,
      adults_and_elderly: 0,
      manual: "",
    },
  });

  const { someFarmings } = useFarmings();

  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
    form.reset({
      id: "",
      farming: "",
      pre_school: 0,
      elementary_school: 0,
      high_school: 0,
      adults_and_elderly: 0,
      manual: "",
    });
  }

  const onEdit = (farming: IFarming) => {
    form.reset(farming);
    
    setOpen(true);
  };

  return (
    <GlassCard className="mb-8 overflow-auto">
      <Header form={form} open={open} handleOpenChange={handleOpenChange} />
      <DataTable
        columns={farmingsColumns({ onUpdate: onEdit })}
        data={someFarmings}
      />
    </GlassCard>
  );
}
