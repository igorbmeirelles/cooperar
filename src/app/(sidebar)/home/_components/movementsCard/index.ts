import { EditButton } from "./buttons/edit";
import { Chip } from "./chip";
import { Root } from "./root";
import { Header } from "./table/head";
import { Title } from "./title";
import { Root as Table } from "./table";
import { DateFilter } from "./data_filter";
export const MovementCard = {
  Root,
  Title,
  Buttons: {
    EditButton,
  },
  Chip,
  DateFilter,
  Table: {
    Root: Table,
    Header,
  },
};
