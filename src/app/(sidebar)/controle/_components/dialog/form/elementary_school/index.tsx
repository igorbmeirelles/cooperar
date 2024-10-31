import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BackpackIcon } from "lucide-react";
import { Active } from "../active";
import { PlannedDaysInput } from "../planned-days";
import { NumberOfPeopleInput } from "../../number-of-people";
import { DateInput } from "../date";
import { SuppliedInput } from "../supplied";
import { IControlForm } from "@/app/(sidebar)/controle";
import { UseFormReturn } from "react-hook-form";
import { FormHeader } from "../header";

interface IProps {
  form: UseFormReturn<IControlForm, undefined>;
}

export function ElementarySchoolCard({ form }: IProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="flex">
          <BackpackIcon className="mr-2" />
          Ensino fundamental (6-15 anos)
        </h3>

        <FormHeader
          form={form}
          nameFields={{
            ageGroup: "elementary_school.ageGroup",
            numberOfPeople: "elementary_school.numberOfPeople",
            plannedDays: "elementary_school.plannedDays",
            supplied: "elementary_school.supplied",
          }}
        />
      </CardHeader>

      <CardContent>
        <Active form={form} name={"elementary_school.active"} />
        <PlannedDaysInput
          form={form}
          name={"elementary_school.plannedDays"}
          disabled={!form.watch("elementary_school.active")}
        />
        <NumberOfPeopleInput
          form={form}
          name={"elementary_school.numberOfPeople"}
          disabled={!form.watch("elementary_school.active")}
        />
        <DateInput
          form={form}
          name={"elementary_school.date"}
          disabled={!form.watch("elementary_school.active")}
        />
        <SuppliedInput
          form={form}
          name={"elementary_school.supplied"}
          disabled={!form.watch("elementary_school.active")}
        />
      </CardContent>
    </Card>
  );
}
