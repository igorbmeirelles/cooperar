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
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function PlannedDaysInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="plannedDays"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Número de dias planejados</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <Tally5Icon className="mr-2" />
              <Input
                {...field}
                type="number"
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
