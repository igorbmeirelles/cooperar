interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function Root({ children, className = "", ...props }: IProps) {
  return <nav className={"bg-glass row-span-2 pl-8 pr-4 pt-6 pb-6 " + className} {...props}>{children}</nav>;
}
