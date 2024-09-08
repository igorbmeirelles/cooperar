import { Dialog } from "../dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useInstitutions } from "../../_context/useInstitutions";
import { IInstitution } from "../../_context/models/Institution";
import { z } from "zod";
import { Alert } from "../alert";
import { useCallback, useState } from "react";
import { ApplicationException } from "@/app/_abstractions/exceptions";

const anInstitutionSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(8, "Telefone deve ter pelo menos 8 caracteres."),
});

interface IAlert {
  title: string;
  description: string;
  open: boolean;
}

export function Header() {
  const { addInstitution } = useInstitutions();
  const [alert, setAlert] = useState<IAlert>({
    title: "",
    description: "",
    open: false,
  });
  const form = useForm<IInstitution>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(anInstitutionSchema),
  });

  const onSubmit = useCallback(
    (anInstitution: IInstitution) => {
      try {
        addInstitution(structuredClone(anInstitution));

        setAlert({
          title: "Cadastro realizado com sucesso!",
          description: "A instituição foi cadastrada.",
          open: true,
        });
        form.reset();
      } catch (ex) {
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
      }
    },
    [addInstitution, setAlert, form]
  );

  const handleCloseAlert = useCallback(() => {
    setAlert({
      title: "",
      description: "",
      open: false,
    });
  }, []);

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium">Instituições</h1>
      <Dialog form={form} onSubmit={onSubmit} />
      <Alert
        open={alert.open}
        description={alert.description}
        onChange={handleCloseAlert}
        title={alert.title}
      />
    </div>
  );
}
