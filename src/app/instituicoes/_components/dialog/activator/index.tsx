import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ActivatorButton } from "./button";

export function DialogActivator() {
  return (
    <DialogTrigger className="ml-auto" asChild>
      <ActivatorButton />
    </DialogTrigger>
  );
}
