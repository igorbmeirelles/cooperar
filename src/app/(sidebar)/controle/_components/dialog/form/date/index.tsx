import { IControl } from "@/app/(sidebar)/controle/_models";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function DateInput({ form }: IProps) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>Data do fornecimento</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="flex items-center">
                  <CalendarIcon className="ml-auto h-4 w-4 mr-2" />
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal justify-start",
                      !field.value && "text-muted-foreground"
                    )}
                    type="button"
                  >
                    {field.value ? (
                      format(field.value, "dd/MM/yyyy")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value || undefined}
                onSelect={field.onChange}
                disabled={(date) =>
                  !(date > new Date()) || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
