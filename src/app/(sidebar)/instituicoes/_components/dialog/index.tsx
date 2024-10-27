import { DialogContent, Dialog as ShadDialog } from "@/components/ui/dialog";
import { DialogBody } from "./body";
import { DialogHeader } from "./header";
import { DialogActivator } from "./activator";
import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
  onSubmit: (data: IInstitution) => void;
  open: boolean;
  handleOpenChange: () => void;
}

export function Dialog({ form, onSubmit, handleOpenChange, open }: IProps) {


  return (
    <ShadDialog open={open} onOpenChange={handleOpenChange}>
      <DialogActivator />
      <DialogContent data-cy="institutions-create-dialog">
        <DialogHeader />
        <DialogBody form={form} onSubmit={onSubmit} />
      </DialogContent>
    </ShadDialog>
  );
}
