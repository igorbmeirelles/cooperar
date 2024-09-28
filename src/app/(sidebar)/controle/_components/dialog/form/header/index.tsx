import { Control, IControl } from "@/app/(sidebar)/controle/_models";
import { BoxIcon, Tally5Icon, UserIcon } from "lucide-react";
import { useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function FormHeader({ form }: IProps) {
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

  return (
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
  );
}
