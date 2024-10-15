"use client";

import { ISupply } from "@/app/(sidebar)/controle/_models";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

type TFarmingData = {
  name: string;
  amount: number;
  fill: string;
  id: string;
};

interface IProps {
  someSupplies: ISupply[];
}

export function FarmingChart({ someSupplies }: IProps) {
  const chartData = useMemo(() => {
    let result: TFarmingData[] = [];

    someSupplies
      .map((supply) => supply.controls)
      .flat()
      .forEach((control) => {
        const existentFarming = result.find(
          (farming) => farming.name == control.farming?.farming
        );

        if (existentFarming) {
          existentFarming.amount += control.supplied;
        } else {
          result.push({
            amount: control.supplied,
            name: control.farming?.farming ?? "",
            fill: `var(--color-${control.farming?.id ?? ""})`,
            id: control.farming?.id ?? "",
          });
        }
      });

    const top5 = result.sort((a, b) => b.amount - a.amount).slice(0, 5);

    const chartConfig = top5.reduce((acc, farming, index) => {
      acc[farming.id] = {
        label: farming.name,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as any);

    return {
      data: top5,
      config: {
        name: {
          label: "Cultura",
        },
        ...chartConfig,
      },
    };
  }, [someSupplies]);

  const totalSupplied = useMemo(() => {
    return someSupplies
      .map((supply) => supply.controls)
      .flat()
      .reduce((acc, curr) => acc + curr.supplied, 0);
  }, [someSupplies]);

  return (
    <>
      <h1 className="text-lg font-medium mb-4">
        Top 5 alimentos mais fornecidos
      </h1>
      <ChartContainer
        config={chartData.config}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData.data}
            dataKey="amount"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="text-3xl font-bold"
                      >
                        {totalSupplied.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                        KG Fornecidos
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
