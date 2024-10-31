"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ISupply, Supply } from "../_models";
import { add, read } from "@/lib/adapters/firebase/config";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { WhereFilterOp } from "firebase/firestore";
import { IInstitution } from "../../instituicoes/_context/models/Institution";

interface ISupplyContext {
  someSupplies: ISupply[];
  readSupplies: () => void;
  writeSupply: (aSupply: ISupply) => Promise<void>;
  editSupply: (aSupply: ISupply) => Promise<void>;
  dateRange: DateRange | undefined;
  setDateRange: (aDateRange: DateRange | undefined) => void;
  institution: IInstitution | null;
  setInstitution: (institution: IInstitution | null) => void;
}

const SupplyContext = createContext<ISupplyContext>({
  someSupplies: [],
  readSupplies: () => {},
  writeSupply: async () => {},
  editSupply: async () => {},
  dateRange: {
    from: addDays(new Date(Date.now()), -90),
    to: new Date(),
  },
  setDateRange: () => {},
  institution: null,
  setInstitution: () => {},
});

export const SupplyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [someSupplies, setSomeSupplies] = useState<ISupply[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(Date.now()), -90),
    to: new Date(),
  });

  const [institution, setInstitution] = useState<IInstitution | null>(null);

  const institutionFilter = useMemo<{
    field: string;
    operator: WhereFilterOp;
    value: any;
  }>(
    () => ({
      field: "controls.institution.email",
      operator: "==",
      value: institution?.email ?? "",
    }),
    [institution]
  );
  const dateFilter = useMemo(
    () => [
      {
        field: "date",
        operator: ">=" as WhereFilterOp,
        value: dateRange?.from ?? addDays(new Date(Date.now()), -90),
      },
      {
        field: "date",
        operator: "<=" as WhereFilterOp,
        value: dateRange?.to ?? new Date(),
      },
    ],
    [dateRange]
  );

  const filters = useMemo(
    () => [institutionFilter, ...dateFilter].filter((filter) => filter.value),
    [institutionFilter, dateFilter]
  );
  const readSupplies = useCallback(() => {
    read<ISupply>({
      collection_name: "supplies",
      orderBy: [{ direction: "desc", field: "date" }],
      where: filters,
    }).then((response) => {
      console.log(response);
      setSomeSupplies(response.map((supply: ISupply) => Supply.create(supply)));
    });
  }, [filters]);

  useEffect(() => {
    readSupplies();
  }, [readSupplies]);

  const writeSupply = useCallback(async (aSupply: ISupply) => {
    await add<ISupply>({
      collection_name: "supplies",
      data: structuredClone(aSupply),
      id: aSupply.id,
    });

    setSomeSupplies((prev) => {
      const newSupplies = [aSupply, ...prev];

      return newSupplies;
    });
  }, []);

  const editSupply = useCallback(async (aSupply: ISupply) => {
    await add({
      collection_name: "supplies",
      data: structuredClone(aSupply),
      id: aSupply.id,
    });

    setSomeSupplies((prev) => {
      const newSupplies = prev.map((supply) =>
        supply.id === aSupply.id ? aSupply : supply
      );

      return newSupplies;
    });
  }, []);
  return (
    <SupplyContext.Provider
      value={{
        someSupplies,
        readSupplies,
        writeSupply,
        editSupply,
        dateRange,
        setDateRange,
        institution,
        setInstitution,
      }}
    >
      {children}
    </SupplyContext.Provider>
  );
};

export const useSupplies = () => {
  const context = useContext(SupplyContext);

  return context;
};
