import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface IProps {
  active: boolean;
  setActive: (active: boolean) => void;
}
export function ActiveCheck({ active, setActive }: IProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={active} onCheckedChange={setActive} />
      <label>
        Somente ativos
      </label>
    </div>
  );
}
