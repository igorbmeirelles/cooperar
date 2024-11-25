import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { IGroupedControls } from "../../_models";

interface IControlActions {
  onUpdate: (control: IGroupedControls) => void;
  onDelete: (control: IGroupedControls) => void;
}

export const supplyControlColumns: (
  actions: IControlActions
) => ColumnDef<IGroupedControls>[] = (actions: IControlActions) => [
  {
    accessorKey: "farming",
    header: "Alimento",
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
    accessorKey: "numberOfPeople",
    header: "Número de Pessoas",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return <span>{row.original.total.toFixed(2)} kg</span>;
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
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return <span>{row?.original?.date?.toLocaleDateString() ?? ""}</span>;
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
