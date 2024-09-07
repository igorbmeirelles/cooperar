import { DialogContent, Dialog as ShadDialog } from "@/components/ui/dialog";
import { DialogBody } from "./body";
import { DialogHeader } from "./header";
import { DialogActivator } from "./activator";
import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../_context/modes/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
  onSubmit: (data: IInstitution) => void;
}

export function Dialog({ form, onSubmit }: IProps) {
  return (
    <ShadDialog>
      <DialogActivator />
      <DialogContent>
        <DialogHeader />
        <DialogBody form={form} onSubmit={onSubmit} />
      </DialogContent>
    </ShadDialog>
  );
}
