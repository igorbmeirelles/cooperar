import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { IControl } from "../../_models";

interface IControlActions {
  onUpdate: (control: IControl) => void;
  onDelete: (control: IControl) => void;
}

export const supplyControlColumns: (
  actions: IControlActions
) => ColumnDef<IControl>[] = (actions: IControlActions) => [
  {
    accessorKey: "ageGroup",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faixa Etária
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "farming",
    header: "Alimento",
  },
  {
    accessorKey: "grossWeightPerCapita",
    header: "Peso Bruto Per Capita",
    cell: ({ row }) => {
      return <span>{row.original.grossWeightPerCapita.toFixed(2)} kg</span>;
    },
  },
  {
    accessorKey: "numberOfPeople",
    header: "Número de Pessoas",
  },
  {
    accessorKey: "plannedDays",
    header: "Dias Planejados",
    cell: ({ row }) => {
      return <span>{row.original.plannedDays} dias</span>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return <span>{row.original.total.toFixed(2)} kg</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return <span>{row?.original?.date?.toLocaleDateString() ?? ""}</span>;
    },
  },
  {
    accessorKey: "institution",
    header: "Instituição",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.institution?.toString().substring(0, 20) ?? ""}
        </span>
      );
    },
  },
  {
    accessorKey: "supplied",
    header: "Fornecido",
    cell: ({ row }) => {
      return <span>{row.original.supplied.toFixed(2)} kg</span>;
    },
  },
  {
    accessorKey: "daysServed",
    header: "Dias Atendidos",
    cell: ({ row }) => {
      return <span>{row.original.daysServed.toFixed(0)} dias</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => actions.onUpdate(row.original)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => actions.onDelete(row.original)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
