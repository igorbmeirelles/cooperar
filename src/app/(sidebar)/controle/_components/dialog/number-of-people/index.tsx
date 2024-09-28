import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { UsersIcon } from "lucide-react";
import { IControl } from "../../../_models";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function NumberOfPeopleInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="numberOfPeople"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Número de pessoas</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <UsersIcon className="mr-2" />
              <Input {...field} type="number" placeholder="Número de pessoas" />
            </div>
          </FormControl>

          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
        </FormItem>
      )}
    />
  );
}
