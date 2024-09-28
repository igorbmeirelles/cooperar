import { BoxIcon, TruckIcon } from "lucide-react";
import { StatusCard } from "./card";
import { useMemo } from "react";
import { IControl } from "../../_models";

interface IProps {
  someControls: IControl[];
}

export function Status({ someControls }: IProps) {
  const totalControl = useMemo(() => {
    return someControls.reduce((acc, curr) => acc + curr.total, 0);
  }, [someControls]);

  const suppliedControl = useMemo(() => {
    return someControls.reduce((acc, curr) => acc + curr.supplied, 0);
  }, [someControls]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-4 mb-8 gap-4">
      <StatusCard
        icon={BoxIcon}
        display={`${totalControl.toFixed(3)} KG`}
        label="Planejado"
      />
      <StatusCard
        icon={TruckIcon}
        display={`${suppliedControl.toFixed(3)} KG`}
        label="Fornecido"
      />
    </div>
  );
}
