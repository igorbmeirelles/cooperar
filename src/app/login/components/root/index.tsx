import styles from "../../styles.module.css";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Root({ children, className = "" }: IProps) {
  return (
    <section className={`${styles["bg-login"]} h-svh grid ${className}`}>
      {children}
    </section>
  );
}
