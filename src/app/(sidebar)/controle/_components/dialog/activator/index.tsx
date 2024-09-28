import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export function Activator() {
  return (
    <DialogTrigger asChild>
      <Button>Adicionar fornecimento</Button>
    </DialogTrigger>
  );
}
