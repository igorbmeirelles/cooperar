import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Password = forwardRef<HTMLInputElement, IProps>(function Password(
  { className = "", type = "password", placeholder = "Password", ...props },
  ref
) {
  return (
    <Input
      ref={ref}
      className={`input-glass ${className}`}
      type={type}
      placeholder={placeholder}
      {...props}
      data-cy="password"
    />
  );
});
