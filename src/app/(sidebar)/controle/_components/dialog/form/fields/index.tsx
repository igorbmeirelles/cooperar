import { IControl } from "@/app/(sidebar)/controle/_models";

import { UseFormReturn } from "react-hook-form";

import { AgeGroupSelect } from "../age-group";
import { FarmingSelect } from "../farming";
import { NumberOfPeopleInput } from "../../number-of-people";
import { PlannedDaysInput } from "../planned-days";
import { DateInput } from "../date";
import { InstitutionSelect } from "../institution";
import { SuppliedInput } from "../supplied";

interface IProps {
  form: UseFormReturn<IControl, any, undefined>;
}

export function FormFields({ form }: IProps) {
  return (
    <>
      <AgeGroupSelect form={form} />

      <FarmingSelect form={form} />

      <NumberOfPeopleInput form={form} />

      <PlannedDaysInput form={form} />

      <DateInput form={form} />

      <InstitutionSelect form={form} />

      <SuppliedInput form={form} />
    </>
  );
}
