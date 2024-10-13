interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Root({ children, className = "", ...props }: IProps) {
  return (
    <div
      className={`shadow-xl col-span-2 md:col-span-3 p-8 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
