import { IControlForm } from "@/app/(sidebar)/controle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BabyIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Active } from "../active";
import { PlannedDaysInput } from "../planned-days";
import { NumberOfPeopleInput } from "../../number-of-people";
import { DateInput } from "../date";
import { SuppliedInput } from "../supplied";
import { FormHeader } from "../header";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
}

export function PreSchoolCard({ form }: IProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="flex">
          <BabyIcon className="mr-2" />
          Pré Escola (4-5 anos)
        </h3>

        <FormHeader
          form={form}
          nameFields={{
            ageGroup: "pre_school.ageGroup",
            numberOfPeople: "pre_school.numberOfPeople",
            plannedDays: "pre_school.plannedDays",
            supplied: "pre_school.supplied",
          }}
        />
      </CardHeader>

      <CardContent>
        <Active form={form} name={"pre_school.active"} />
        <PlannedDaysInput
          form={form}
          name={"pre_school.plannedDays"}
          disabled={!form.watch("pre_school.active")}
        />
        <NumberOfPeopleInput
          form={form}
          name={"pre_school.numberOfPeople"}
          disabled={!form.watch("pre_school.active")}
        />
        <DateInput
          form={form}
          name={"pre_school.date"}
          disabled={!form.watch("pre_school.active")}
        />
        <SuppliedInput
          form={form}
          name={"pre_school.supplied"}
          disabled={!form.watch("pre_school.active")}
        />
      </CardContent>
    </Card>
  );
}
