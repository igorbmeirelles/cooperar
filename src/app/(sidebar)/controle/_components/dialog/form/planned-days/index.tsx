import { IControlForm } from "@/app/(sidebar)/controle";
import { IControl } from "@/app/(sidebar)/controle/_models";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Tally5Icon } from "lucide-react";
import { FieldPath, UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
  name: any;
  disabled?: boolean;
}

export function PlannedDaysInput({ form, name, disabled }: IProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Número de dias planejados</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <Tally5Icon className="mr-2" />
              <Input
                {...field}
                type="number"
                disabled={disabled}
                placeholder="Número de dias planejados"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
