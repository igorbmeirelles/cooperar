"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { IFarming } from "../../_models";

export const farmingsColumns: ColumnDef<IFarming>[] = [
  {
    accessorKey: "farming",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cultura
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pre_school",
    header: "Pré - escola",
  },
  {
    accessorKey: "elementary_school",
    header: "Ensino Fundamental",
  },
  {
    accessorKey: "high_school",
    header: "Ensino médio",
  },
  {
    accessorKey: "adults_and_elderly",
    header: "Adultos/Idosos",
  },
  {
    accessorKey: "manual",
    header: "Manual",
  },
];
