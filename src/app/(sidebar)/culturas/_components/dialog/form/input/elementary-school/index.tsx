import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BackpackIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm>;
}

export function ElementarySchoolInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="elementary_school"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Ensino fundamental (6-15 anos)</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <BackpackIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Ensino fundamental (6-15 anos)"
                data-cy="farming-dialog-elementary_school"
                type="number"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-elementary_school-error" />
        </FormItem>
      )}
    />
  );
}
