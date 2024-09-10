import { Supply } from "@/app/(sidebar)/controle/_models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Supply>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
];
