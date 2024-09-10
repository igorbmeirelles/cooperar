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
}

const SupplyContext = createContext<ISupplyContext>({
  someSupplies: [],
  readSupplies: () => {},
  writeSupply: () => {},
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
    const supplies = JSON.parse(localStorage.getItem("supplies") ?? "[]");

    setSomeSupplies([...supplies, aSupply]);
  }, []);

  return (
    <SupplyContext.Provider value={{ someSupplies, readSupplies, writeSupply }}>
      {children}
    </SupplyContext.Provider>
  );
};

export const useSupplies = () => {
  const context = useContext(SupplyContext);

  return context;
};
