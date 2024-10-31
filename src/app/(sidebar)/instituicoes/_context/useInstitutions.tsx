"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IInstitution, Institution } from "./models/Institution";
import { add, read } from "@/lib/adapters/firebase/config";
import { WhereFilterOp } from "firebase/firestore";

interface IInstitutionContext {
  someInstitutions: IInstitution[];
  addInstitution: (
    institutions: IInstitution
  ) => Promise<{ operation: "add" | "update" }>;
  onlyActive: boolean;
  setOnlyActive: (onlyActive: boolean) => void;
}

const InstitutionContext = createContext<IInstitutionContext>({
  someInstitutions: [],
  addInstitution: async () => ({ operation: "update" }),
  onlyActive: true,
  setOnlyActive: () => {},
});

interface IProps extends PropsWithChildren<{}> {}

export function InstitutionsProvider({ children }: IProps) {
  const [someInstitutions, setSomeInstitutions] = useState<IInstitution[]>([]);
  const [onlyActive, setOnlyActive] = useState<boolean>(true);

  const isActiveFilter = useMemo(
    () => ({
      field: "isActive",
      operator: "==" as WhereFilterOp,
      value: onlyActive,
    }),
    [onlyActive]
  );

  const filters = useMemo(
    () => [isActiveFilter].filter((filter) => filter.value),
    [isActiveFilter]
  );

  useEffect(() => {
    read<IInstitution>({
      collection_name: "companies",
      orderBy: [{ direction: "asc", field: "name" }],
      where: filters,
    }).then((result) => {
      setSomeInstitutions(
        result.map(
          (institution) => Institution.create(institution) as IInstitution
        )
      );
    });
  }, [onlyActive, filters]);

  async function writeInstitution(
    anInstitutions: IInstitution
  ): Promise<IInstitution> {
    return await add<IInstitution>({
      collection_name: "companies",
      data: anInstitutions,
      id: anInstitutions.email,
    });
  }

  const addInstitution = async (
    anInstitution: IInstitution
  ): Promise<{ operation: "update" | "add" }> => {
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
    <InstitutionContext.Provider
      value={{
        someInstitutions,
        addInstitution,
        onlyActive,
        setOnlyActive,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
}

export const useInstitutions = () => useContext(InstitutionContext);
