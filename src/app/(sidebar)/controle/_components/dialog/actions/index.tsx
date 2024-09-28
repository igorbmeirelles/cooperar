import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export function Actions() {
  return (
    <DialogFooter>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Fechar</Button>
      </DialogTrigger>
      <Button type="submit">Adicionar</Button>
    </DialogFooter>
  );
}
