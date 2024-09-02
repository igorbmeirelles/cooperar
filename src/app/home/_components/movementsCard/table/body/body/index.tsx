import { TableBody } from "@/components/ui/table";

interface IProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function Body({ children, ...props }: IProps) {
  return <TableBody {...props}>{children}</TableBody>;
}
