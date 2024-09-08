import { forwardRef } from "react";

import { ActivatorButton } from "./button";
import { DialogTrigger } from "@/components/ui/dialog";

export const DialogActivator = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function DialogActivator(props, ref) {
  return (
    <DialogTrigger className="ml-auto" asChild>
      <ActivatorButton ref={ref} {...props} />
    </DialogTrigger>
  );
});

