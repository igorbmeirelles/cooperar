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
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm>;
}

export function AdultsAndElderlyInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="adults_and_elderly"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Adultos e idosos</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <UsersIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Adultos e idosos"
                data-cy="farming-dialog-adults_and_elderly"
                type="number"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
