"use client";

import {
  createContext,
  PropsWithChildren,
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
    // data.forEach((data) => {
    //   add<IInstitution>({ collection_name: "companies", data, id: data.email });
    // });
    read<IInstitution>({ collection_name: "companies" }).then((result) => {
      setSomeInstitutions(
        result.map(
          (institution) => Institution.create(institution) as IInstitution
        )
      );
    });
  }, []);

  async function writeInstitution(
    anInstitutions: IInstitution
  ): Promise<IInstitution> {
    return await add<IInstitution>({
      collection_name: "companies",
      data: anInstitutions,
      id: anInstitutions.email,
    });
  }

  const addInstitution = async (anInstitution: IInstitution) => {
    const existentInstitutions = (anExistentInstitution: IInstitution) =>
      anInstitution.email === anExistentInstitution.email;

    if (someInstitutions.some(existentInstitutions)) {
      throw new ApplicationException(
        "Instituição já cadastrada",
        ExceptionCode.VALIDATION
      );
    }

    await writeInstitution(anInstitution);

    setSomeInstitutions((prev: IInstitution[]) => {
      return [anInstitution as IInstitution, ...prev];
    });
  };

  return (
    <InstitutionContext.Provider value={{ someInstitutions, addInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
}

export const useInstitutions = () => useContext(InstitutionContext);
