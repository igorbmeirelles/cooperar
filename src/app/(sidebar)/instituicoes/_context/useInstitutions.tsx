"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IInstitution, Institution } from "./models/Institution";
import {
  ApplicationException,
  ExceptionCode,
} from "@/app/_abstractions/exceptions";
import data from "./models/data.json";
import { add, read } from "@/lib/adapters/firebase/config";

interface IInstitutionContext {
  someInstitutions: IInstitution[];
  addInstitution: (institutions: IInstitution) => Promise<{ operation: "add" | "update" }>;
  onlyActive: boolean;
  setOnlyActive: (onlyActive: boolean) => void;
}

const InstitutionContext = createContext<IInstitutionContext>({
  someInstitutions: [],
  addInstitution: async () => ({operation: "update"}),
  onlyActive: true,
  setOnlyActive: () => {},
});

interface IProps extends PropsWithChildren<{}> {}

export function InstitutionsProvider({ children }: IProps) {
  const [someInstitutions, setSomeInstitutions] = useState<IInstitution[]>([]);
  const [onlyActive, setOnlyActive] = useState<boolean>(true);
  useEffect(() => {
    // data.forEach((data) => {
    //   add<IInstitution>({ collection_name: "companies", data, id: data.email });
    // });
    read<IInstitution>({
      collection_name: "companies",
      orderBy: [{ direction: "asc", field: "name" }],
      where: onlyActive ? [{ field: "isActive", operator: "==", value: true }] : [],
    }).then((result) => {
      setSomeInstitutions(
        result.map(
          (institution) => Institution.create(institution) as IInstitution
        )
      );
    });
  }, [onlyActive]);

  async function writeInstitution(
    anInstitutions: IInstitution
  ): Promise<IInstitution> {
    return await add<IInstitution>({
      collection_name: "companies",
      data: anInstitutions,
      id: anInstitutions.email,
    });
  }

  const addInstitution = async (anInstitution: IInstitution) : Promise<{operation: "update" | "add"}> => {
    const existentInstitutions = (anExistentInstitution: IInstitution) =>
      anInstitution.email === anExistentInstitution.email;

    if (someInstitutions.some(existentInstitutions)) {
      await writeInstitution(anInstitution);

      setSomeInstitutions((prev: IInstitution[]) => {
        return prev.map((institution) => {
          if (institution.email === anInstitution.email) {
            return anInstitution;
          }
          return institution;
        });
      });

      return { operation: "update" };
    }

    await writeInstitution(anInstitution);

    setSomeInstitutions((prev: IInstitution[]) => {
      return [anInstitution as IInstitution, ...prev];
    });

    return { operation: "add" };
  };

  return (
    <InstitutionContext.Provider value={{ someInstitutions, addInstitution, onlyActive, setOnlyActive }}>
      {children}
    </InstitutionContext.Provider>
  );
}

export const useInstitutions = () => useContext(InstitutionContext);
