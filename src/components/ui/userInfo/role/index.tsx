interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Role({ children, className = "", ...props }: IProps) {
  return (
    <p className={`text-xs font-light ${className}`} {...props}>
      {children}
    </p>
  );
}
