"use client"

import { InstitutionsProvider } from "@/app/(sidebar)/instituicoes/_context/useInstitutions";
import { AuthProvider } from "../auth";
import { FarmingContextProvider } from "@/app/(sidebar)/culturas/_context";
import { SupplyContextProvider } from "@/app/(sidebar)/controle/_context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InstitutionsProvider>
        <FarmingContextProvider>
          <SupplyContextProvider>{children}</SupplyContextProvider>
        </FarmingContextProvider>
      </InstitutionsProvider>
    </AuthProvider>
  );
}
