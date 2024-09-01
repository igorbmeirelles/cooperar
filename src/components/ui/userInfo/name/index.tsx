interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Name({ children, className = "", ...props }: IProps) {
  return (
    <h2 className={`text-sm ${children}`} {...props}>
      {children}
    </h2>
  );
}
