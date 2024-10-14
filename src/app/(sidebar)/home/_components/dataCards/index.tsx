"use client";

import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { InfoCard } from "../infoCard";
import { BoxIcon, TruckIcon } from "lucide-react";
import { HistogramChart } from "../histogramChart";
import { FarmingChart } from "../farmingChart";

export function DataCards() {
  const { someSupplies } = useSupplies();

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
      <InfoCard.Root className="col-span p-4 h-full flex flex-col justify-between">
        <HistogramChart someSupplies={someSupplies} />
      </InfoCard.Root>
      <InfoCard.Root className="col-span p-4 h-full">
        <FarmingChart someSupplies={someSupplies} />
      </InfoCard.Root>
    </>
  );
}
