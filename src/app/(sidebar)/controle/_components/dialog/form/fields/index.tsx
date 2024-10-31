import { UseFormReturn } from "react-hook-form";

import { FarmingSelect } from "../farming";

import { InstitutionSelect } from "../institution";

import { IControlForm } from "@/app/(sidebar)/controle";

import { AdultsAndElderlyCard } from "../aldults_and_elderly";
import { HighSchoolCard } from "../high_school";
import { ElementarySchoolCard } from "../elementary_school";
import { PreSchoolCard } from "../pre_school";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
}

export function FormFields({ form }: IProps) {
  return (
    <>
      {/* <AgeGroupSelect form={form} /> */}
      <InstitutionSelect form={form} />

      <FarmingSelect form={form} />

      <PreSchoolCard form={form} />

      <ElementarySchoolCard form={form} />

      <HighSchoolCard form={form} />

      <AdultsAndElderlyCard form={form} />
    </>
  );
}
