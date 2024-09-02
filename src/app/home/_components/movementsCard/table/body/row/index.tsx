import { TableCell, TableRow } from "@/components/ui/table";
import { MovementCard } from "../../..";
import { EditButton } from "../../../buttons/edit";

export function Row() {
  return (
    <TableRow>
      <TableCell>Recanto Arlete Rodrigues</TableCell>
      <TableCell>1000</TableCell>
      <TableCell>1000</TableCell>
      <TableCell>20/08/2021</TableCell>
      <TableCell>20/08/2021</TableCell>
      <TableCell>
        <MovementCard.Chip>Concluído</MovementCard.Chip>
      </TableCell>
      <TableCell>
        <EditButton href={"#"} />
      </TableCell>
    </TableRow>
  );
}
