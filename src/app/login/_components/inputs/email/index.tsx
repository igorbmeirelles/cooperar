import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Email = forwardRef<HTMLInputElement, IProps>(function Email(
  { className = "", type = "email", placeholder = "Email", ...props },
  ref
) {
  return (
    <Input
      ref={ref}
      className={`input-glass ${className}`}
      type={type}
      placeholder={placeholder}
      {...props}
      data-cy="email"
    />
  );
});
