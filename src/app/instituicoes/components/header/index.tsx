import { Dialog } from "../dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useInstitutions } from "../../_context/useInstitutions";
import { IInstitution } from "../../_context/modes/Institution";
import { z } from "zod";

const anInstitutionSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(8, "Telefone deve ter pelo menos 8 caracteres."),
});

export function Header() {
  const { addInstitution } = useInstitutions();

  const onSubmit = (anInstitution: IInstitution) => {
    addInstitution(structuredClone(anInstitution));
    form.reset();
  };

  const form = useForm<IInstitution>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(anInstitutionSchema),
  });

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium">Instituições</h1>
      <Dialog form={form} onSubmit={onSubmit} />
    </div>
  );
}
