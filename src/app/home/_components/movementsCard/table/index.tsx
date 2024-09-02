import { Table } from "@/components/ui/table";
import { Header } from "./head";
import { Body } from "./body/body";
import { Row } from "./body/row";

export function Root() {
  return (
    <Table>
      <Header />
      <Body>
        <Row />
      </Body>
    </Table>
  );
}
