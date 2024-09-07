import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInstitution } from "../../_context/modes/Institution";

interface IProps {
  someInstitutions: IInstitution[];
}

export function InstitutionsTable({ someInstitutions }: IProps) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Nome</TableHead>
          <TableHead className="text-white">Email</TableHead>
          <TableHead className="text-white">Telefone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {someInstitutions.map((institution) => (
          <TableRow key={institution.email}>
            <TableCell>{institution.name}</TableCell>
            <TableCell>{institution.email}</TableCell>
            <TableCell>{institution.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
