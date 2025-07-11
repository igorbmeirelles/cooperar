import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";
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

export function AdultsAndElderlyCard({ form }: IProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="flex">
          <UsersIcon className="mr-2" />
          Adultos e idosos (18 anos ou mais)
        </h3>

        <FormHeader
          form={form}
          nameFields={{
            ageGroup: "adults_and_elderly.ageGroup",
            numberOfPeople: "adults_and_elderly.numberOfPeople",
            plannedDays: "adults_and_elderly.plannedDays",
            supplied: "adults_and_elderly.supplied",
          }}
        />
      </CardHeader>

      <CardContent>
        <Active form={form} name={"adults_and_elderly.active"} />
        <PlannedDaysInput
          form={form}
          name={"adults_and_elderly.plannedDays"}
          disabled={!form.watch("adults_and_elderly.active")}
        />
        <NumberOfPeopleInput
          form={form}
          name={"adults_and_elderly.numberOfPeople"}
          disabled={!form.watch("adults_and_elderly.active")}
        />
        <DateInput
          form={form}
          name={"adults_and_elderly.date"}
          disabled={!form.watch("adults_and_elderly.active")}
        />
        <SuppliedInput
          form={form}
          name={"adults_and_elderly.supplied"}
          disabled={!form.watch("adults_and_elderly.active")}
        />
      </CardContent>
    </Card>
  );
}
