import { UseFormReturn } from "react-hook-form";
import { NameInput } from "../../../form/nameInput";
import { EmailInput } from "../../../form/emailInput";
import { PhoneInput } from "../../../form/phoneInput";
import { IInstitution } from "@/app/(sidebar)/instituicoes/_context/models/Institution";

interface IProps {
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function Fields({ form }: IProps) {
  return (
    <div>
      <NameInput form={form} />
      <EmailInput form={form} />
      <PhoneInput form={form} />
    </div>
  );
}
