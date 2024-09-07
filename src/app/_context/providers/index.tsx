import { InstitutionsProvider } from "@/app/instituicoes/_context/useInstitutions";
import { AuthProvider } from "../auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InstitutionsProvider>{children}</InstitutionsProvider>
    </AuthProvider>
  );
}
