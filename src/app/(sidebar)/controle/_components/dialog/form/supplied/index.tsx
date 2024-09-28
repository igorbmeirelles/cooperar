import { IControl } from "@/app/(sidebar)/controle/_models";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { TruckIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function SuppliedInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="supplied"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Quantidade fornecida (Kg)</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <TruckIcon className="mr-2" />
              <Input
                {...field}
                type="number"
                placeholder="Quantidade fornecida"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
