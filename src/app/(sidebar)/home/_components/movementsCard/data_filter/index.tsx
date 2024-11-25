"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useSupplies } from "@/app/(sidebar)/controle/_context";
import { FileSpreadsheet } from "lucide-react";
import { utils, write } from "xlsx";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function DateFilter({ className }: IProps) {
  const {
    dateRange: date,
    setDateRange: setDate,
    someSupplies,
  } = useSupplies();

  const handleExportToExcel = () => {
    const data = someSupplies.flatMap((supply) => {
      return supply.groupedControls;
    });

    const csv = data.map((row) => {
      return {
        Instituição: row.institution?.name,
        Cultura: row.farming?.farming,
        "Previsto (soma)": row.total,
        "Fornecido (soma)": row.supplied,
        Data: row.date,
        Lote: row.supplyId,
      };
    });

    const workSheet = utils.json_to_sheet(csv);
    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, workSheet, "Sheet 1");

    const base64 = write(workBook, { type: "base64", bookType: "xlsx" });

    const link = document.createElement("a");
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
    link.download = `Planilha de fornecimento.xlsx`;
    link.click();
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="ml-auto">
        <Button onClick={handleExportToExcel} variant="default">
          <FileSpreadsheet size={16} className="mr-2" />
          Exportar para Excel
        </Button>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
