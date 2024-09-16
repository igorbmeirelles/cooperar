"use client";

import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { DataTable } from "./data-table";
import { SupplyControlColumns, supplyControlColumns } from "./columns/columns";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export function Root() {
  const { someSupplies } = useSupplies();

  const { push } = useRouter();

  const onUpdate = useCallback(
    (control: SupplyControlColumns) => {
      push(`/controle/${control.id}`);
    },
    [push]
  );

  const data = useMemo(() => {
    const controls = someSupplies
      .map((supply) => {
        return supply.controls.map((control) => {
          return SupplyControlColumns.from(control, supply.id);
        });
      })
      .flat();

    return controls;
  }, [someSupplies]);

  return <DataTable columns={supplyControlColumns({ onUpdate })} data={data} />;
}
