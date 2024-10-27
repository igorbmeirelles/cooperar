import { UseFormReturn } from "react-hook-form";
import { NameInput } from "../../../form/nameInput";
import { PhoneInput } from "../../../form/phoneInput";
import { IInstitution } from "@/app/(sidebar)/instituicoes/_context/models/Institution";
import { ActiveCheck } from "../../../form/active-check";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function Fields({ form }: IProps) {
  return (
    <div>
      <NameInput form={form} />
      <PhoneInput form={form} />
      <ActiveCheck form={form} />
    </div>
  );
}
