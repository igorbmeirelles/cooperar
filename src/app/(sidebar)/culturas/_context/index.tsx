"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Farming, IFarming } from "../_models";
import {
  ApplicationException,
  ExceptionCode,
} from "@/app/_abstractions/exceptions";

import farmings from "../_models/farmings.json";

interface FarmingContextType {
  someFarmings: Farming[];
  addFarming: (aFarming: Farming) => void;
}

const context = createContext<FarmingContextType>({
  someFarmings: [],
  addFarming: () => {},
});

interface IProps extends PropsWithChildren<{}> {}
export function FarmingContextProvider({ children }: IProps) {
  const [someFarmings, setSomeFarmings] = useState<Farming[]>([]);

  useEffect(() => {
    setSomeFarmings(
      JSON.parse(
        localStorage.getItem("farmings") ?? JSON.stringify(farmings)
      ).map((farming: IFarming) => Farming.create(farming))
    );
  }, []);

  const addFarming = useCallback(
    (aFarming: IFarming) => {
      const farmingExists = someFarmings.some(
        (farming: IFarming) => farming.farming === aFarming.farming
      );

      if (farmingExists)
        throw new ApplicationException(
          "Cultura já cadastrada",
          ExceptionCode.VALIDATION
        );

      setSomeFarmings((prevFarmings: IFarming[]) => {
        const newFarmings = [aFarming, ...prevFarmings];

        localStorage.setItem("farmings", JSON.stringify(newFarmings));

        return newFarmings;
      });
    },
    [someFarmings]
  );

  return (
    <context.Provider value={{ someFarmings, addFarming }}>
      {children}
    </context.Provider>
  );
}

export const useFarmings = () => useContext(context);
