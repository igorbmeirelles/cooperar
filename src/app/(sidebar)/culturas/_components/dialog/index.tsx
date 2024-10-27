import {
  DialogContent,
  Dialog as ShadDialog,
} from "@/components/ui/dialog";

import { UseFormReturn } from "react-hook-form";
import { DialogBody } from "./body";
import { Activator } from "./activator";
import { Header } from "./header";

export interface IFarmingForm {
  id: string;
  farming: string;
  pre_school: number;
  elementary_school: number;
  high_school: number;
  adults_and_elderly: number;
  manual: string;
}

interface IProps {
  form: UseFormReturn<IFarmingForm, any, undefined>;
  onSubmit: (data: IFarmingForm) => void;
  open: boolean
  handleOpenChange: () => void
}

export function Dialog({ form, onSubmit, open, handleOpenChange }: IProps) {
  return (
    <ShadDialog open={open} onOpenChange={handleOpenChange}>
      <Activator />
      <DialogContent aria-describedby="farming-dialog" data-cy="farming-dialog" className="sm:max-w-[425px]">
        <Header />
        <DialogBody form={form} onSubmit={onSubmit} />
      </DialogContent>
    </ShadDialog>
  );
}
