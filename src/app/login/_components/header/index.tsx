interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ children, className = "", ...props }: IProps) {
  return (
    <div className={`flex items-center gap-3 justify-center mb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
