import { useForm } from "react-hook-form";
import { Dialog, IFarmingForm } from "../dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useState } from "react";
import { Alert } from "../alert";
import { ApplicationException } from "@/app/_abstractions/exceptions";
import { useFarmings } from "../../_context";
import { Farming } from "../../_models";

const schema = z.object({
  farming: z.string().min(3, "Cultura deve ter no mínimo 3 caracteres"),
  pre_school: z.coerce.number().positive("Deve ser um número positivo"),
  elementary_school: z.coerce.number().positive("Deve ser um número positivo"),
  high_school: z.coerce.number().positive("Deve ser um número positivo"),
  adults_and_elderly: z.coerce.number().positive("Deve ser um número positivo"),
  manual: z.string(),
});

export function Header() {
  const form = useForm<IFarmingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      farming: "",
      pre_school: 0,
      elementary_school: 0,
      high_school: 0,
      adults_and_elderly: 0,
      manual: "",
    },
  });
  const { addFarming } = useFarmings();

  const [alert, setAlert] = useState({
    title: "",
    description: "",
    isOpen: false,
  });

  const onChange = useCallback(
    () => setAlert((prev) => ({ ...prev, isOpen: false })),
    []
  );

  const onSubmit = useCallback(
    (values: IFarmingForm) => {
      try {
        addFarming(
          new Farming(
            values.farming,
            values.pre_school,
            values.elementary_school,
            values.high_school,
            values.adults_and_elderly,
            values.manual
          )
        );

        setAlert((prev) => ({
          ...prev,
          title: "Cultura criada",
          description: "Cultura criada com sucesso",
          isOpen: true,
        }));

        form.reset();
      } catch (ex: any) {
        console.log(ex);
        console.log(ex instanceof ApplicationException);
        if (ex instanceof ApplicationException) {
          setAlert((prev) => ({
            ...prev,
            title: "Cultura já cadastrada",
            description: "Já existe uma cultura cadastrada com esse nome",
            isOpen: true,
          }));

          return;
        }

        setAlert((prev) => ({
          ...prev,
          title: "Ops. Parece que algo deu errado.",
          description: "Ocorreu um erro inesperado",
          isOpen: true,
        }));
      }
    },
    [form, addFarming]
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-medium font-medium">Tabela Per capita</h1>
      <Dialog form={form} onSubmit={onSubmit} />
      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        description={alert.description}
        onChange={onChange}
      />
    </div>
  );
}
