interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function LinkWrapper({ children, className = "", ...props }: IProps) {
  return (
    <li className={`mb-2 ${className}`} {...props}>
      {children}
    </li>
  );
}
