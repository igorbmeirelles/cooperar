import { InstitutionsProvider } from "@/app/(sidebar)/instituicoes/_context/useInstitutions";
import { AuthProvider } from "../auth";
import { FarmingContextProvider } from "@/app/(sidebar)/culturas/_context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InstitutionsProvider>
        <FarmingContextProvider>{children}</FarmingContextProvider>
      </InstitutionsProvider>
    </AuthProvider>
  );
}
