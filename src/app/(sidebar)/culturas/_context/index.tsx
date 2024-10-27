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
import { add, read } from "@/lib/adapters/firebase/config";

interface FarmingContextType {
  someFarmings: Farming[];
  addFarming: (aFarming: Farming) => Promise<void>;
  updateFarming: (aFarming: Farming) => Promise<void>;
}

const context = createContext<FarmingContextType>({
  someFarmings: [],
  addFarming: async () => {},
  updateFarming: async () => {},
});

interface IProps extends PropsWithChildren<{}> {}
export function FarmingContextProvider({ children }: IProps) {
  const [someFarmings, setSomeFarmings] = useState<Farming[]>([]);

  useEffect(() => {
    // farmings.forEach((farming) => {
    //   add({ collection_name: "farmings", data: farming, id: farming.id });
    // });
    read<IFarming>({
      collection_name: "farmings",
      orderBy: [{ direction: "asc", field: "farming" }],
    }).then((result) => {
      const farmings = result.map(
        (farming: IFarming) => Farming.create(farming) as Farming
      );

      setSomeFarmings(farmings);
    });
  }, []);

  const addFarming = useCallback(
    async (aFarming: IFarming) => {
      const farmingExists = someFarmings.some(
        (farming: IFarming) => farming.farming === aFarming.farming
      );

      if (farmingExists)
        throw new ApplicationException(
          "Cultura já cadastrada",
          ExceptionCode.VALIDATION
        );

      await add({
        collection_name: "farmings",
        data: structuredClone(aFarming),
        id: aFarming.id,
      });

      setSomeFarmings((prevFarmings: IFarming[]) => {
        const newFarmings = [aFarming, ...prevFarmings];

        return newFarmings;
      });
    },
    [someFarmings]
  );

  const updateFarming = useCallback(async (aFarming: IFarming) => {
    await add({
      collection_name: "farmings",
      data: structuredClone(aFarming),
      id: aFarming.id,
    });

    setSomeFarmings((prevFarmings: IFarming[]) => {
      const newFarmings = prevFarmings.map((farming) =>
        farming.id === aFarming.id ? aFarming : farming
      );

      return newFarmings;
    });
  }, []);

  return (
    <context.Provider value={{ someFarmings, addFarming, updateFarming }}>
      {children}
    </context.Provider>
  );
}

export const useFarmings = () => useContext(context);
