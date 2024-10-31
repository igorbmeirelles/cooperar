"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { DatePicker } from "./date_picker";
import { CompaniesSelect } from "./companies_select";

export function DateFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-wrap gap-2 ", className)}>
      <DatePicker />
      {/* <CompaniesSelect /> */}
    </div>
  );
}
