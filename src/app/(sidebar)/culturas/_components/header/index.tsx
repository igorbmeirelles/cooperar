import { UseFormReturn } from "react-hook-form";
import { Dialog, IFarmingForm } from "../dialog";
import { useCallback, useState } from "react";
import { Alert } from "../alert";
import { ApplicationException } from "@/app/_abstractions/exceptions";
import { useFarmings } from "../../_context";
import { Farming } from "../../_models";

interface IProps {
  form: UseFormReturn<IFarmingForm, any, undefined>;
  open: boolean;
  handleOpenChange: () => void;
}

export function Header({ form, open, handleOpenChange }: IProps) {
  const { addFarming, updateFarming } = useFarmings();

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
    async (values: IFarmingForm) => {
      try {
        if (form.getValues().id) {
          await updateFarming(
            new Farming(
              values.farming,
              values.pre_school,
              values.elementary_school,
              values.high_school,
              values.adults_and_elderly,
              values.manual,
              form.getValues().id
            )
          );

          setAlert((prev) => ({
            ...prev,
            title: "Cultura atualizada",
            description: "Cultura atualizada com sucesso",
            isOpen: true,
          }));

          return
        }

        await addFarming(
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

        handleOpenChange();
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
    [form, addFarming, updateFarming, handleOpenChange]
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-medium font-medium">Tabela Per capita</h1>
      <Dialog
        form={form}
        onSubmit={onSubmit}
        open={open}
        handleOpenChange={handleOpenChange}
      />
      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        description={alert.description}
        onChange={onChange}
      />
    </div>
  );
}
