import { TableRow } from "@/components/ui/table";
import { Cell } from "../cell";

export function Row() {
  return (
    <TableRow>
      <Cell className="text-white">Instituição</Cell>
      <Cell>Planejado</Cell>
      <Cell>Fornecido</Cell>
      <Cell>De</Cell>
      <Cell>Até</Cell>
      <Cell>Status</Cell>
      <Cell className="w-[100px]"></Cell>
    </TableRow>
  );
}
