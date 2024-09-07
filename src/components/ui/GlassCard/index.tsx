interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ children, className, ...props }: IProps) {
  return (
    <div
      className={`bg-glass p-8 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
