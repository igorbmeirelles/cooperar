import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MailIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../../_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}
export function EmailInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <MailIcon className="mr-2" />
              <Input {...field} placeholder="Nome da Instituição" data-cy="institutions-create-dialog-email" />
            </div>
          </FormControl>

          <FormMessage data-cy="institutions-create-dialog-email-error" />
        </FormItem>
      )}
    />
  );
}
