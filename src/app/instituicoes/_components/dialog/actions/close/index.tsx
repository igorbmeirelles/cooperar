import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export function CloseAction() {
  return (
    <DialogClose asChild>
      <Button variant="secondary">Fechar</Button>
    </DialogClose>
  );
}
