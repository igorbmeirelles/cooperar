interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Main({ children, className = "", ...props }: IProps) {
  return (
    <main className={`m-auto bg-glass p-6 min-w-80 rounded-xl ${className}`} {...props}>
      {children}
    </main>
  );
}
