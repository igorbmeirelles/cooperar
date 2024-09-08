import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GraduationCapIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IFarmingForm } from "../../..";

interface IProps {
  form: UseFormReturn<IFarmingForm>;
}

export function HighSchoolInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="high_school"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Ensino médio (16-18 anos)</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <GraduationCapIcon className="mr-2" />
              <Input
                {...field}
                placeholder="Ensino médio (16-18 anos)"
                data-cy="farming-dialog-high_school"
                type="number"
              />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-high_school-error" />
        </FormItem>
      )}
    />
  );
}
