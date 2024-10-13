interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Root({ children, className = "", ...props }: IProps) {
  return (
    <div className={`col-span-1 shadow-lg rounded-lg p-2 h-fit ${className}`} {...props}>
      {children}
    </div>
  );
}
