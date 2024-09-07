import { Layout } from "@/components/ui/default";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
