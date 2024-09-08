import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

export const ActivatorButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function ActivatorButton(props, ref) {
  return (
    <Button ref={ref} {...props} data-cy="institutions-add-button">
      Nova Instituição
    </Button>
  );
});
