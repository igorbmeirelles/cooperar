import styles from "../styles.module.css";

interface IProps extends React.HTMLAttributes<HTMLElement> {}

export function Root({ children, className = "", ...props }: IProps) {
  return (
    <section
      className={`${styles["bg-home"]} min-h-svh layout-grid ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
