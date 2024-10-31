import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { UsersIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IControlForm } from "../../..";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
  name: any;
  disabled?: boolean;
}

export function NumberOfPeopleInput({ form, name, disabled }: IProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Número de pessoas</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <UsersIcon className="mr-2" />
              <Input
                {...field}
                disabled={disabled}
                type="number"
                placeholder="Número de pessoas"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
