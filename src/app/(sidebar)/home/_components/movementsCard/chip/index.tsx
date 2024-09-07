interface IProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Chip({ children, className = "", ...props }: IProps) {
  return (
    <span
      className={`bg-green-600/20 text-green-400 py-1 px-2 text-xs rounded ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
