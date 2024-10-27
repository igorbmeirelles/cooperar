import { Dialog } from "../dialog";
import { UseFormReturn } from "react-hook-form";
import { useInstitutions } from "../../_context/useInstitutions";
import { IInstitution } from "../../_context/models/Institution";

import { Alert } from "../alert";
import { useCallback, useState } from "react";
import { ApplicationException } from "@/app/_abstractions/exceptions";
import { set } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { ActiveCheck } from "../form/filter/active";

interface IAlert {
  title: string;
  description: string;
  open: boolean;
}

interface IProps {
  open: boolean;
  setOpen: (openState: boolean) => void;
  form: UseFormReturn<IInstitution, any, undefined>;
}

export function Header({ open, setOpen, form }: IProps) {
  const { addInstitution, onlyActive, setOnlyActive } = useInstitutions();
  const [alert, setAlert] = useState<IAlert>({
    title: "",
    description: "",
    open: false,
  });

  const handleException = useCallback(
    (ex: Error) => {
      console.error(ex);
      if (ex instanceof ApplicationException) {
        setAlert({
          title: "Ops. Parece que algo deu errado.",
          description: ex.message,
          open: true,
        });
      } else {
        setAlert({
          title: "Ops. Parece que algo deu errado.",
          description: "Ocorreu um erro inesperado",
          open: true,
        });
      }
    },
    [setAlert]
  );

  const onSubmit = useCallback(
    async (anInstitution: IInstitution) => {
      try {
        const { operation } = await addInstitution(
          structuredClone(anInstitution)
        );

        if (operation === "add") {
          setAlert({
            title: "Cadastro realizado com sucesso!",
            description: "A instituição foi cadastrada.",
            open: true,
          });

          setOpen(false);

          form.reset();

          return;
        }

        setAlert({
          title: "Cadastro atualizado com sucesso!",
          description: "A instituição foi atualizada.",
          open: true,
        });
      } catch (ex) {
        handleException(ex as Error);
      }
    },
    [addInstitution, setOpen, handleException, form]
  );

  const handleCloseAlert = useCallback(() => {
    setAlert({
      title: "",
      description: "",
      open: false,
    });
  }, []);

  const handleOpenChange = useCallback(() => {
    setOpen(!open);
    form.reset();
  }, [form, open, setOpen]);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-medium">Instituições</h1>
        <ActiveCheck active={onlyActive} setActive={setOnlyActive} />
      </div>
      <Dialog
        form={form}
        onSubmit={onSubmit}
        open={open}
        handleOpenChange={handleOpenChange}
      />
      <Alert
        open={alert.open}
        description={alert.description}
        onChange={handleCloseAlert}
        title={alert.title}
      />
    </div>
  );
}
