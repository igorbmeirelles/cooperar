interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ children, className, ...props }: IProps) {
  return (
    <div
      className={`p-8 shadow-xl rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
