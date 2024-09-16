"use client";

import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { DataTable } from "./data-table";
import { SupplyControlColumns, supplyControlColumns } from "./columns/columns";
import { useCallback, useMemo } from "react";

export function Root() {
  const { someSupplies } = useSupplies();

  const onUpdate = useCallback(() => {}, []);

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
