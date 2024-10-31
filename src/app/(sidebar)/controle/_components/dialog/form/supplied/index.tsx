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
import { TruckIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
  name: any;
  disabled?: boolean;
}

export function SuppliedInput({ form, name, disabled }: IProps) {
  return (
    <FormField
      control={form.control}
      name={name}
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
                disabled={disabled}
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
