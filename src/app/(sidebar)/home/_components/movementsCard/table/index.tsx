"use client";

import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { DataTable } from "./data-table";
import { supplyControlColumns } from "./columns/columns";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GroupedControls } from "@/app/(sidebar)/controle/_models";

export function Root() {
  const { someSupplies } = useSupplies();

  const { push } = useRouter();

  const onUpdate = useCallback(
    (control: GroupedControls) => {
      push(`/controle/${control.supplyId}`);
    },
    [push]
  );

  const data = useMemo(() => {
    const controls = someSupplies.flatMap((supply) => {
      return supply.groupedControls;
    });

    return controls;
  }, [someSupplies]);

  return <DataTable columns={supplyControlColumns({ onUpdate })} data={data} />;
}
