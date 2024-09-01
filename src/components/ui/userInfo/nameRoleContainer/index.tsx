interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NameRoleContainer({ children, ...props }: IProps) {
  return <div {...props}>{children}</div>;
}
