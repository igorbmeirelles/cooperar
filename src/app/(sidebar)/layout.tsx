import { Layout } from "@/components/ui/default";
import { Providers } from "./providers";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
