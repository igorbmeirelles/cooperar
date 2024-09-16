"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlassCard } from "@/components/ui/GlassCard";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DataTable } from "./_components/data-table";
import { supplyControlColumns } from "./_components/columns";
import {
  BoxIcon,
  Building2,
  Building2Icon,
  CalendarIcon,
  SaveIcon,
  Tally5,
  Tally5Icon,
  TruckIcon,
  UserIcon,
  UsersIcon,
  WheatIcon,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectLabel,
} from "@/components/ui/select";
import { useFarmings } from "../culturas/_context";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { ageGroup, TAgeGroupKey } from "@/app/_lib/constants";
import { useInstitutions } from "../instituicoes/_context/useInstitutions";
import { IControl, Control, Supply } from "./_models";
import { useSupplies } from "./_context";

const schema = z.object({
  id: z.string().optional(),
  ageGroup: z.object({
    key: z.string(),
    name: z.string(),
    ageGroup: z.string(),
  }),
  farming: z.object({
    id: z.string(),
    farming: z.string(),
    pre_school: z.number().positive(),
    elementary_school: z.number().positive(),
    high_school: z.number().positive(),
    adults_and_elderly: z.number().positive(),
    manual: z.string(),
  }),
  numberOfPeople: z.coerce
    .number()
    .positive("Número de pessoas deve ser positivo"),
  plannedDays: z.coerce
    .number()
    .positive("Número de dias planejados deve ser positivo"),
  date: z.coerce.date().optional(),
  institution: z.object(
    {
      name: z.string(),
      email: z.string(),
      phone: z.string(),
    },
    { message: "Instituição obrigatória" }
  ),
  supplied: z.coerce
    .number()
    .nonnegative("Quantidade fornecida deve ser positiva")
    .optional(),
});

export default function Controle() {
  const form = useForm<IControl>({
    defaultValues: new Control(
      undefined,
      undefined,
      0,
      0,
      undefined,
      undefined,
      0,
      undefined
    ),
    resolver: zodResolver(schema),
  });

  const { someFarmings } = useFarmings();
  const { someInstitutions } = useInstitutions();

  const [someControls, setSomeControls] = useState<IControl[]>([]);

  const onSubmit = (aFormData: IControl) => {
    if (someControls.some((control) => control.id === aFormData.id)) {
      setSomeControls((prev) =>
        prev.map((control) =>
          control.id === aFormData.id ? Control.create(aFormData) : control
        )
      );

      return;
    }

    setSomeControls((prev) => [...prev, Control.create(aFormData)]);
    form.reset(
      new Control(
        undefined,
        undefined,
        0,
        0,
        undefined,
        undefined,
        0,
        undefined
      )
    );
  };

  const totalControl = useMemo(() => {
    return someControls.reduce((acc, curr) => acc + curr.total, 0);
  }, [someControls]);

  const suppliedControl = useMemo(() => {
    return someControls.reduce((acc, curr) => acc + curr.supplied, 0);
  }, [someControls]);

  const numberOfPeople = useWatch({
    control: form.control,
    name: "numberOfPeople",
  });

  const plannedDays = useWatch({
    control: form.control,
    name: "plannedDays",
  });

  const ageGroupValue = useWatch({
    control: form.control,
    name: "ageGroup",
  });

  const farming = useWatch({
    control: form.control,
    name: "farming",
  });

  const supplied = useWatch({
    control: form.control,
    name: "supplied",
  });

  const totalDialog = useMemo(() => {
    if (!farming || !ageGroupValue) return 0;

    return Control.calculateTotal(
      farming,
      ageGroupValue,
      numberOfPeople,
      plannedDays
    );
  }, [numberOfPeople, plannedDays, farming, ageGroupValue]);

  const daysServedDialog = useMemo(() => {
    if (totalDialog === 0) return 0;

    return (supplied * plannedDays) / totalDialog;
  }, [supplied, plannedDays, totalDialog]);

  const grossWeightPerCapitaDialog = useMemo(() => {
    if (!farming || !ageGroupValue) return 0;

    return Control.calculateGrossWeightPerCapita(farming, ageGroupValue);
  }, [farming, ageGroupValue]);

  const onDeleteRequest = (aControl: IControl) => {
    setSomeControls((prev) =>
      prev.filter((control) => control.id !== aControl.id)
    );
  };

  const onUpdateRequest = (aControl: IControl) => {
    form.reset(Control.create(aControl));

    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);

    if (!open) {
      form.reset(
        new Control(
          undefined,
          undefined,
          0,
          0,
          undefined,
          undefined,
          0,
          undefined
        )
      );
    }
  };
  const { writeSupply } = useSupplies();
  const saveControls = () => {
    writeSupply(new Supply(someControls));

    setSomeControls([]);
  };
  return (
    <GlassCard className="mb-8 overflow-auto backdrop-blur-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-medium font-medium">Controle de fornecimento</h1>
        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>Adicionar fornecimento</Button>
            </DialogTrigger>

            <DialogContent aria-describedby="add-supply-description">
              <DialogHeader>
                <DialogTitle>Adicionar fornecimento</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <section>
                    <div className="gap-2 mb-4 border-b border-t py-4 mb-2">
                      <h2 className="text-sm font-regular flex items-center mb-2">
                        <UserIcon className="w-4 h-4 mr-2" />
                        {grossWeightPerCapitaDialog.toFixed(3)}
                        Kg per capta
                      </h2>
                      <h2 className="text-sm font-regular flex items-center mb-2">
                        <BoxIcon className="w-4 h-4 mr-2" />
                        {totalDialog.toFixed(2)}
                        Kg total
                      </h2>
                      <h2 className="text-sm font-regular flex items-center mb-2">
                        <Tally5Icon className="w-4 h-4 mr-2" />
                        {daysServedDialog.toFixed(0)} dias atendidos
                      </h2>
                    </div>
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
                                  const selectedOption =
                                    ageGroup[value as TAgeGroupKey];
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
                                    {Object.entries(ageGroup).map(
                                      ([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                          {value.toString()}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>

                          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
                        </FormItem>
                      )}
                    />

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
                                      <SelectItem
                                        value={farming.id}
                                        key={farming.id}
                                      >
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

                    <FormField
                      control={form.control}
                      name="numberOfPeople"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Número de pessoas</FormLabel>
                          <FormControl>
                            <div className="flex items-center mb-4">
                              <UsersIcon className="mr-2" />
                              <Input
                                {...field}
                                type="number"
                                placeholder="Número de pessoas"
                              />
                            </div>
                          </FormControl>

                          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plannedDays"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Número de dias planejados</FormLabel>
                          <FormControl>
                            <div className="flex items-center mb-4">
                              <Tally5Icon className="mr-2" />
                              <Input
                                {...field}
                                type="number"
                                placeholder="Número de dias planejados"
                              />
                            </div>
                          </FormControl>

                          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
                        </FormItem>
                      )}
                    />

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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  !(date > new Date()) ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                                    (anInstitution) =>
                                      anInstitution.email === value
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
                                    {someInstitutions.map((institution) => (
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

                    <FormField
                      control={form.control}
                      name="supplied"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Quantidade fornecida (Kg)</FormLabel>
                          <FormControl>
                            <div className="flex items-center mb-4">
                              <TruckIcon className="mr-2" />
                              <Input
                                {...field}
                                type="number"
                                placeholder="Quantidade fornecida"
                              />
                            </div>
                          </FormControl>

                          <FormMessage data-cy="farming-dialog-adults_and_elderly-error" />
                        </FormItem>
                      )}
                    />
                  </section>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button variant={"ghost"}>Fechar</Button>
                    </DialogTrigger>
                    <Button type="submit">Adicionar</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Button variant={"outline"} onClick={saveControls}>
            <SaveIcon className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4 mb-8">
        <GlassCard className="flex flex-col items-center justify-center">
          <BoxIcon className="w-8 h-8 mr-2 text-white" />
          <p className="text-2xl font-medium text-white">
            {totalControl.toFixed(3)} KG
          </p>
          <h2 className="text-xl font-medium text-white">Planejado</h2>
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center">
          <TruckIcon className="w-8 h-8 mr-2 text-white" />
          <p className="text-2xl font-medium text-white">
            {suppliedControl.toFixed(3)} KG
          </p>
          <h2 className="text-xl font-medium text-white">Fornecido</h2>
        </GlassCard>
      </div>

      <DataTable
        columns={supplyControlColumns({
          onDelete: onDeleteRequest,
          onUpdate: onUpdateRequest,
        })}
        data={someControls}
      />
    </GlassCard>
  );
}
