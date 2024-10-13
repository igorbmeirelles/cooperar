import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInstitution } from "../../_context/models/Institution";

interface IProps {
  someInstitutions: IInstitution[];
}

export function InstitutionsTable({ someInstitutions }: IProps) {
  return (
    <Table className="mt-4" data-cy="institutions-table">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {someInstitutions.map((institution) => (
          <TableRow key={institution.email}>
            <TableCell data-cy="institutions-table-name">{institution.name}</TableCell>
            <TableCell data-cy="institutions-table-email">{institution.email}</TableCell>
            <TableCell data-cy="institutions-table-phone">{institution.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
