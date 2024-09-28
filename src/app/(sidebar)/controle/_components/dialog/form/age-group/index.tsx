import { IControl } from "@/app/(sidebar)/controle/_models";
import { ageGroup, TAgeGroupKey } from "@/app/_lib/constants";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function AgeGroupSelect({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="ageGroup"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Faixa etária</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <UsersIcon className="mr-2" />
              <Select
                data-cy="farming-dialog-adults_and_elderly"
                onValueChange={(value) => {
                  const selectedOption = ageGroup[value as TAgeGroupKey];
                  field.onChange(selectedOption);
                }}
                defaultValue={field.value?.key}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma faixa etária" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Faixa etária</SelectLabel>
                    {Object.entries(ageGroup).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.toString()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
