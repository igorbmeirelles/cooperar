interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function NavContainer({ children, ...props }: IProps) {
  return <ul {...props}>{children}</ul>;
}
