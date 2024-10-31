import { Dialog as ShadDialog, DialogContent } from "@/components/ui/dialog";

import { UseFormReturn } from "react-hook-form";

import { IControl } from "../../_models";

import { Body } from "./body";
import { Header } from "./header";
import { Activator } from "./activator";
import { IControlForm } from "../..";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
  open: boolean;
  handleOpenChange: () => void;
  onSubmit: (aFormData: IControlForm) => void;
}

export function Dialog({ form, handleOpenChange, open, onSubmit }: IProps) {
  return (
    <ShadDialog open={open} onOpenChange={handleOpenChange}>
      <Activator />
      <DialogContent aria-describedby="add-supply-description">
        <Header />
        <Body form={form} onSubmit={onSubmit} />
      </DialogContent>
    </ShadDialog>
  );
}
