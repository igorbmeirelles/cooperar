import { GlassCard } from "@/components/ui/GlassCard";
import { Header } from "./header";
import { useInstitutions } from "../_context/useInstitutions";
import { InstitutionsTable } from "./institutionsTable";


export function Institutions() {
  const { someInstitutions } = useInstitutions();

  return (
    <GlassCard className="p-8 backdrop-blur-3xl mb-8 overflow-auto">
      <Header />
      <InstitutionsTable someInstitutions={someInstitutions} />
    </GlassCard>
  );
}
