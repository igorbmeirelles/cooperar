import { Form } from "@/components/ui/form";
import { DialogActions } from "../actions";
import { UseFormReturn } from "react-hook-form";
import { Fields } from "./fields";
import { IInstitution } from "../../../_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
  onSubmit: (data: IInstitution) => void;
}

export function DialogBody({ form, onSubmit }: IProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Fields form={form} />
        <DialogActions />
      </form>
    </Form>
  );
}
