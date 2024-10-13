"use client";

import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { InfoCard } from "../infoCard";
import { BoxIcon, TruckIcon } from "lucide-react";
import { HistogramChart } from "../histogramChart";

export function DataCards() {
  const { someSupplies } = useSupplies();

  const totalControl = someSupplies
    .map((supply) =>
      supply.controls.reduce((acc, control) => acc + control.total, 0)
    )
    .reduce((acc, supply) => acc + supply, 0);

  const suppliedControl = someSupplies
    .map((supply) =>
      supply.controls.reduce((acc, control) => acc + control.supplied, 0)
    )
    .reduce((acc, supply) => acc + supply, 0);

  return (
    <>
      {/* <InfoCard.Root className="p-6 flex flex-col items-center justify-center">
        <BoxIcon className="w-8 h-8 mr-2" />
        <p className="text-2xl font-medium">{totalControl.toFixed(3)} KG</p>
        <h2 className="text-xl font-medium">Planejado</h2>
      </InfoCard.Root>
      <InfoCard.Root className="p-6 flex flex-col items-center justify-center">
        <TruckIcon className="w-8 h-8 mr-2" />
        <p className="text-2xl font-medium">{suppliedControl.toFixed(3)} KG</p>
        <h2 className="text-xl font-medium">Fornecido</h2>
      </InfoCard.Root> */}
      <InfoCard.Root className="col-span p-4">
        <HistogramChart someSupplies={someSupplies} />
      </InfoCard.Root>
    </>
  );
}
