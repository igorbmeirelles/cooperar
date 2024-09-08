import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BuildingIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IInstitution } from "../../../_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function NameInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <div className="flex items-center mb-4">
              <BuildingIcon className="mr-2" />
              <Input {...field} placeholder="Nome da Instituição" data-cy="institutions-create-dialog-name" />
            </div>
          </FormControl>

          <FormMessage data-cy="institutions-create-dialog-name-error" />
        </FormItem>
      )}
    />
  );
}
