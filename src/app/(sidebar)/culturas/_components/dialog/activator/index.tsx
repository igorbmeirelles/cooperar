import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import { forwardRef } from "react";

export const Activator = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Activator(props, ref) {
  return (
    <DialogTrigger asChild>
      <Button ref={ref} data-cy="create-farming-button" {...props}>
        Inserir cultura
      </Button>
    </DialogTrigger>
  );
});
