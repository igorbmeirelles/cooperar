import { UseFormReturn } from "react-hook-form";
import { AdultsAndElderlyInput } from "../input/adults-elderly";
import { ElementarySchoolInput } from "../input/elementary-school";
import { FarmingInput } from "../input/farming";
import { HighSchoolInput } from "../input/high-school";
import { ManualInput } from "../input/manual";
import { PreSchoolInput } from "../input/pre-school";
import { IFarmingForm } from "../..";

interface IProps {
  form: UseFormReturn<IFarmingForm, any, undefined>
}

export function FormFields({ form }: IProps) {
  return (
    <div className="grid gap-4 py-4">
      <FarmingInput form={form} />
      <PreSchoolInput form={form} />
      <ElementarySchoolInput form={form} />
      <HighSchoolInput form={form} />
      <AdultsAndElderlyInput form={form} />
      <ManualInput form={form} />
    </div>
  );
}
