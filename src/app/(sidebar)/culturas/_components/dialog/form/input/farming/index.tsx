import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WheatIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm, any, undefined>
}
export function FarmingInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="farming"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Cultura</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <WheatIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Cultura"
                data-cy="farming-dialog-farming"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-farming-error" />
        </FormItem>
      )}
    />
  );
}
