import { IControlForm } from "@/app/(sidebar)/controle";
import { IControl } from "@/app/(sidebar)/controle/_models";
import { useInstitutions } from "@/app/(sidebar)/instituicoes/_context/useInstitutions";

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

import { Building2Icon } from "lucide-react";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
}

export function InstitutionSelect({ form }: IProps) {
  const { someInstitutions } = useInstitutions();

  const onlyActive = useMemo(
    () => someInstitutions.filter((institution) => institution.isActive),
    [someInstitutions]
  );

  return (
    <FormField
      control={form.control}
      name="institution"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Instituição</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <Building2Icon className="mr-2" />
              <Select
                data-cy="farming-dialog-adults_and_elderly"
                onValueChange={(value) => {
                  const selectedOption = someInstitutions.find(
                    (anInstitution) => anInstitution.email === value
                  );

                  field.onChange(selectedOption);
                }}
                defaultValue={field.value?.email}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma instituição" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Instituição</SelectLabel>
                    {onlyActive.map((institution) => (
                      <SelectItem
                        value={institution.email}
                        key={institution.email}
                      >
                        {institution.name.substring(0, 20)}
                        {institution.name.length > 20 && "..."}
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
