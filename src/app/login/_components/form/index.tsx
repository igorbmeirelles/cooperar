interface IProps extends React.HTMLAttributes<HTMLFormElement> {}

export function Form({ children, className = "", ...props }: IProps) {
  return (
    <form className={`flex flex-col gap-2 mt-8 ${className}`} {...props}>
      {children}
    </form>
  );
}
