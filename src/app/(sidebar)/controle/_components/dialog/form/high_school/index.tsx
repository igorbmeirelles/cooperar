import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCapIcon } from "lucide-react";
import { Active } from "../active";
import { PlannedDaysInput } from "../planned-days";
import { NumberOfPeopleInput } from "../../number-of-people";
import { DateInput } from "../date";
import { SuppliedInput } from "../supplied";
import { UseFormReturn } from "react-hook-form";
import { IControlForm } from "@/app/(sidebar)/controle";
import { FormHeader } from "../header";

interface IProps {
  form: UseFormReturn<IControlForm, any, undefined>;
}

export function HighSchoolCard({ form }: IProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="flex">
          <GraduationCapIcon className="mr-2" />
          Ensino médio (6-15 anos)
        </h3>

        <FormHeader
          form={form}
          nameFields={{
            ageGroup: "high_school.ageGroup",
            numberOfPeople: "high_school.numberOfPeople",
            plannedDays: "high_school.plannedDays",
            supplied: "high_school.supplied",
          }}
        />
      </CardHeader>

      <CardContent>
        <Active form={form} name={"high_school.active"} />
        <PlannedDaysInput
          form={form}
          name={"high_school.plannedDays"}
          disabled={!form.watch("high_school.active")}
        />
        <NumberOfPeopleInput
          form={form}
          name={"high_school.numberOfPeople"}
          disabled={!form.watch("high_school.active")}
        />
        <DateInput
          form={form}
          name={"high_school.date"}
          disabled={!form.watch("high_school.active")}
        />
        <SuppliedInput
          form={form}
          name={"high_school.supplied"}
          disabled={!form.watch("high_school.active")}
        />
      </CardContent>
    </Card>
  );
}
