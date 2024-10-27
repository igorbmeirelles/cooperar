import { GlassCard } from "@/components/ui/GlassCard";
import { Header } from "./header";
import { useInstitutions } from "../_context/useInstitutions";
import { InstitutionsTable } from "./institutionsTable";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IInstitution } from "../_context/models/Institution";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ulid } from "ulid";

const anInstitutionSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(8, "Telefone deve ter pelo menos 8 caracteres."),
  isActive: z.boolean().default(true).optional()
});


export function Institutions() {
  const { someInstitutions } = useInstitutions();

  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<IInstitution>({
    defaultValues: {
      name: "",
      email: `${ulid()}@email.com`,
      phone: "",
      isActive: true,
    },
    resolver: zodResolver(anInstitutionSchema),
  });

  const onOpenChange = useCallback(() => {
    setDialogOpen(!dialogOpen);
    form.reset({
      name: "",
      email: `${ulid()}@email.com`,
      phone: "",
      isActive: true,
    })
  }, [dialogOpen, setDialogOpen, form]);

  const onEdit = useCallback((email: string) => {
    const institution = someInstitutions.find((i) => i.email === email);

    setDialogOpen(!dialogOpen);

    form.reset(institution);

  }, [form, someInstitutions, dialogOpen, setDialogOpen]);

  return (
    <GlassCard className="p-8 backdrop-blur-3xl mb-8 overflow-auto">
      <Header form={form} open={dialogOpen} setOpen={onOpenChange} />
      <InstitutionsTable someInstitutions={someInstitutions} onEdit={onEdit} />
    </GlassCard>
  );
}
