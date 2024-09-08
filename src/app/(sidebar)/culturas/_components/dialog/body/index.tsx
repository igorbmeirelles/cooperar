import { Form } from "@/components/ui/form";
import { FormFields } from "../form/fields";
import { UseFormReturn } from "react-hook-form";
import { IFarmingForm } from "..";
import { Actions } from "../actions";

interface IProps {
  form: UseFormReturn<IFarmingForm, any, undefined>;
  onSubmit: (data: IFarmingForm) => void;
}
export function DialogBody({ form, onSubmit }: IProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFields form={form} />
        <Actions />
      </form>
    </Form>
  );
}
