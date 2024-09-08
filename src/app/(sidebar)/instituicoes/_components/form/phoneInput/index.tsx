import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../../_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function PhoneInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <PhoneIcon className="mr-2" />
              <Input {...field} placeholder="Telefone" data-cy="institutions-create-dialog-phone" />
            </div>
          </FormControl>

          <FormMessage data-cy="institutions-create-dialog-phone-error" />
        </FormItem>
      )}
    />
  );
}
