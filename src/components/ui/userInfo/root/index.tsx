interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Root({children, className="", ...props} : IProps) {
  return (
    <div className={`inline-flex items-center gap-4 ml-auto shadow-xl rounded-full py-2 pl-8 pr-4 ${className}`} {...props}>
      {children}
    </div>
  )
}