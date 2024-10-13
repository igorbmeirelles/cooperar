import style from "../../styles.module.css";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Main({ children, className = "", ...props }: IProps) {
  return (
    <main className={`bg-glass m-auto shadow-xl p-6 min-w-80 rounded-xl ${className}`} {...props}>
      {children}
    </main>
  );
}
