"use client";

import { ISupply } from "@/app/(sidebar)/controle/_models";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface IProps {
  someSupplies: ISupply[];
}

type TChartData = {
  institution: string;
  planned: number;
  provided: number;
};

export function HistogramChart({ someSupplies }: IProps) {
  const chartData = useMemo(() => {
    let result: TChartData[] = [];

    someSupplies
      .map((supply) => supply.controls)
      .flat()
      .forEach((control) => {
        const existentInstitution = result.find(
          (el) => el.institution == control.institution?.name
        );

        if (existentInstitution) {
          existentInstitution.provided += control.supplied;
          existentInstitution.planned += control.total;
        } else {
          result.push({
            institution: control.institution?.name ?? "",
            planned: control.total,
            provided: control.supplied,
          });
        }
      });

    return result;
  }, [someSupplies]);

  let chartConfig = {
    planned: {
      label: "Planejado",
      color: "#2563eb",
    },
    provided: {
      label: "Fornecido",
      color: "#60a5fa",
    },
  };

  return (
    <>
      <h1 className="text-lg font-medium mb-4">Fornecido nos últimos meses</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="institution"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="planned" fill="var(--color-planned)" radius={4} />
          <Bar dataKey="provided" fill="var(--color-provided)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
