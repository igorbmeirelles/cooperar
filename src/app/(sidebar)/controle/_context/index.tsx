"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ISupply, Supply } from "../_models";

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
    const supplies = JSON.parse(localStorage.getItem("supplies") ?? "[]");

    setSomeSupplies(supplies.map((supply: ISupply) => Supply.create(supply)));
  }, []);

  useEffect(() => {
    readSupplies();
  }, [readSupplies]);

  const writeSupply = useCallback((aSupply: ISupply) => {
    setSomeSupplies((prev) => {
      const newSupplies = [aSupply, ...prev];

      localStorage.setItem("supplies", JSON.stringify(newSupplies));

      return newSupplies;
    });
  }, []);

  const editSupply = useCallback((aSupply: ISupply) => {
    setSomeSupplies((prev) => {
      const newSupplies = prev.map((supply) =>
        supply.id === aSupply.id ? aSupply : supply
      );

      localStorage.setItem("supplies", JSON.stringify(newSupplies));

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
