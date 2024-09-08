import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HandIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm>;
}

export function ManualInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="manual"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Manual</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <HandIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Manual"
                data-cy="farming-dialog-manual"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
