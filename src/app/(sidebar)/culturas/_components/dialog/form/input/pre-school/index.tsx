import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BabyIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm>;
}
export function PreSchoolInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="pre_school"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Pré Escola (4-5 anos)</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <BabyIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Pré Escola (4-5 anos)"
                data-cy="farming-dialog-pre_school"
                type="number"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-pre_school-error" />
        </FormItem>
      )}
    />
  );
}
