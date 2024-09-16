import { Control, IControl, Supply } from "@/app/(sidebar)/controle/_models";
import { Badge } from "@/components/ui/badge";
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

interface IControlActions {
  onUpdate: (control: SupplyControlColumns) => void;
}

export class SupplyControlColumns extends Control {
  id: string | undefined;

  private constructor(control: IControl, id: string | undefined) {
    super(
      control.ageGroup,
      control.farming,
      control.numberOfPeople,
      control.plannedDays,
      control.date,
      control.institution,
      control.supplied,
      control.id
    );
    this.id = id;
  }

  get status() {
    return this.isCompleted ? "Concluído" : "Incompleto";
  }

  static from(control: Control, id: string | undefined) {
    return new SupplyControlColumns(control, id);
  }
}

export const supplyControlColumns: (
  actions: IControlActions
) => ColumnDef<SupplyControlColumns>[] = (actions: IControlActions) => [
  {
    accessorKey: "id",
    header: "Lote",
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: "institution",
    header: "Instituição",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.institution?.toString().slice(0, 20)}
          {row.original.institution &&
          row.original.institution?.toString()?.length > 20
            ? "..."
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "daysServed",
    header: "Dias Servidos",
    cell: ({ row }) => {
      return <div>{row.original.daysServed.toFixed(0)}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Em",
    cell: ({ row }) => {
      return <div>{row.original.date !== undefined ? row.original.date?.toLocaleDateString() : ""}</div>;
    },
  },
  {
    accessorKey: "supplied",
    header: "Planejado",
    cell: ({ row }) => {
      return <div>{row.original.supplied} KG</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isCompleted ? "default" : "secondary"}>
          {row.original.status}
        </Badge>
      );
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
