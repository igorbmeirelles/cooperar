"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable } from "./_components/data-table";
import { farmingsColumns } from "./_components/columns";
import { Header } from "./_components/header";
import { useFarmings } from "./_context";

export default function PerCapta() {
  const { someFarmings } = useFarmings();

  return (
    <GlassCard className="mb-8">
      <Header />
      <DataTable columns={farmingsColumns} data={someFarmings} />
    </GlassCard>
  );
}
