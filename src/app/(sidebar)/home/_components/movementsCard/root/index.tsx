interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Root({ children, className = "", ...props }: IProps) {
  return (
    <div
      className={`bg-glass col-span-2 md:col-span-3 p-8 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
