import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../../_context/models/Institution";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function ActiveCheck({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="mb-4 flex items-center">
          <FormControl>
            <Switch
              className="mt-2"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormLabel className="ml-2">Ativo</FormLabel>

          <FormMessage data-cy="institutions-create-dialog-email-error" />
        </FormItem>
      )}
    />
  );
}
