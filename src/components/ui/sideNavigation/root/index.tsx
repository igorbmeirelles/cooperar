interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function Root({ children }: IProps) {
  return <nav className={"bg-glass row-span-2 pl-8 pr-4 pt-6"}>{children}</nav>;
}
