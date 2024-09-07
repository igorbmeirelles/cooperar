interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Title({ children, className = "", ...props }: IProps) {
  return (
    <h2 className={`font-medium mb-5 ${className}`} {...props}>
      {children}
    </h2>
  );
}
