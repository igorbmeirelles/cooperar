import { Form } from "@/components/ui/form";
import { FormHeader } from "../form/header";
import { FormFields } from "../form/fields";
import { Actions } from "../actions";
import { UseFormReturn } from "react-hook-form";
import { IControl } from "../../../_models";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
  onSubmit: (aFormData: IControl) => void;
}

export function Body({ form, onSubmit }: IProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section>
          <FormHeader form={form} />
          <FormFields form={form} />
        </section>
        <Actions />
      </form>
    </Form>
  );
}
