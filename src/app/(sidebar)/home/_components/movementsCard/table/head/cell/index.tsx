import { TableHead } from "@/components/ui/table";

interface IProps extends React.HTMLAttributes<HTMLTableHeaderCellElement> {}

export function Cell({ children, className = "", ...props }: IProps) {
  return (
    <TableHead className={`${className}`} {...props}>
      {children}
    </TableHead>
  );
}
