"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ISupply, Supply } from "../_models";
import { add, read } from "@/lib/adapters/firebase/config";

interface ISupplyContext {
  someSupplies: ISupply[];
  readSupplies: () => void;
  writeSupply: (aSupply: ISupply) => void;
  editSupply: (aSupply: ISupply) => void;
}

const SupplyContext = createContext<ISupplyContext>({
  someSupplies: [],
  readSupplies: () => {},
  writeSupply: () => {},
  editSupply: () => {},
});

export const SupplyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [someSupplies, setSomeSupplies] = useState<ISupply[]>([]);

  const readSupplies = useCallback(() => {
    // const supplies = JSON.parse(localStorage.getItem("supplies") ?? "[]");
    read<ISupply>({
      collection_name: "supplies",
      orderBy: [{ direction: "desc", field: "date" }],
    }).then((response) => {
      setSomeSupplies(response.map((supply: ISupply) => Supply.create(supply)));
    });
  }, []);

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
      value={{ someSupplies, readSupplies, writeSupply, editSupply }}
    >
      {children}
    </SupplyContext.Provider>
  );
};

export const useSupplies = () => {
  const context = useContext(SupplyContext);

  return context;
};
