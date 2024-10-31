import { IControlForm } from "@/app/(sidebar)/controle";
import { IControl } from "@/app/(sidebar)/controle/_models";
import { useFarmings } from "@/app/(sidebar)/culturas/_context";

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

import { WheatIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
}

export function FarmingSelect({ form }: IProps) {
  const { someFarmings } = useFarmings();

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
              <Select
                data-cy="farming-dialog-adults_and_elderly"
                onValueChange={(value) => {
                  const selectedOption = someFarmings.find(
                    (aFarming) => aFarming.id === value
                  );

                  field.onChange(selectedOption);
                }}
                defaultValue={field.value?.id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma cultura" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cultura</SelectLabel>
                    {someFarmings.map((farming) => (
                      <SelectItem value={farming.id} key={farming.id}>
                        {farming.farming}
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
