import { EditButton } from "./buttons/edit";
import { Chip } from "./chip";
import { Root } from "./root";
import { Header } from "./table/head";
import { Title } from "./title";
import { Root as Table } from "./table";
export const MovementCard = {
  Root,
  Title,
  Buttons: {
    EditButton,
  },
  Chip,
  Table: {
    Root: Table,
    Header,
  },
};
