"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IInstitution } from "./models/Institution";
import {
  ApplicationException,
  ExceptionCode,
} from "@/app/_abstractions/exceptions";
interface IInstitutionContext {
  someInstitutions: IInstitution[];
  addInstitution: (institutions: IInstitution) => void;
}

const InstitutionContext = createContext<IInstitutionContext>({
  someInstitutions: [],
  addInstitution: () => {},
});

interface IProps extends PropsWithChildren<{}> {}

export function InstitutionsProvider({ children }: IProps) {
  const [someInstitutions, setSomeInstitutions] = useState<IInstitution[]>([]);

  useEffect(() => {
    const institutions = JSON.parse(
      localStorage.getItem("institutions") ?? "[]"
    );
    setSomeInstitutions(institutions);
  }, []);

  const writeInstitutions = (anInstitutionsList: IInstitution[]) => {
    localStorage.setItem("institutions", JSON.stringify(anInstitutionsList));
  };

  const addInstitution = (anInstitution: IInstitution) => {
    const existentInstitutions = (anExistentInstitution: IInstitution) =>
      anInstitution.email === anExistentInstitution.email;

    if (someInstitutions.some(existentInstitutions)) {
      throw new ApplicationException(
        "Instituição já cadastrada",
        ExceptionCode.VALIDATION
      );
    }

    setSomeInstitutions((prev: IInstitution[]) => {
      const aNewList = [...prev, structuredClone(anInstitution)];

      writeInstitutions(aNewList);
      return aNewList;
    });
  };

  return (
    <InstitutionContext.Provider value={{ someInstitutions, addInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
}

export const useInstitutions = () => useContext(InstitutionContext);
