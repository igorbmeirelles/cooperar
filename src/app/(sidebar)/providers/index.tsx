import { SupplyContextProvider } from "../controle/_context";
import { FarmingContextProvider } from "../culturas/_context";
import { InstitutionsProvider } from "../instituicoes/_context/useInstitutions";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <InstitutionsProvider>
      <FarmingContextProvider>
        <SupplyContextProvider>{children}</SupplyContextProvider>
      </FarmingContextProvider>
    </InstitutionsProvider>
  );
}
