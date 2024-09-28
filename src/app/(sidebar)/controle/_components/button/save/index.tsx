import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

interface IProps {
  onClick: () => void;
}

export function SaveButton({ onClick }: IProps) {
  return (
    <Button variant={"outline"} onClick={onClick}>
      <SaveIcon className="w-4 h-4 mr-2" />
      Salvar
    </Button>
  );
}
