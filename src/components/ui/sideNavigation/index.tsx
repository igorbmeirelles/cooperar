import { Cooperar } from "@/components/icons/logo/cooperar";
import { Logo } from "@/components/icons/logo/logo";
import {
  BuildingIcon,
  LayoutDashboardIcon,
  PackageIcon,
  TableIcon,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

export function SideNavigation() {
  return (
    <aside className={"bg-glass row-span-2 pl-8 pr-4 pt-6"}>
      <div className="flex gap-2 items-center justify-center mb-8">
        <Logo />
        <Cooperar />
      </div>
      <ul>
        <li className="mb-2">
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-full px-4 py-2 text-white font-small bg-primary"
          >
            <LayoutDashboardIcon />
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-full px-4 py-2 font-small hover:bg-gray-50/10"
          >
            <PackageIcon />
            Controle de fornecimento
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-full px-4 py-2 font-small hover:bg-gray-50/10"
          >
            <TableIcon />
            Tabela per capta
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-full px-4 py-2 font-small hover:bg-gray-50/10"
          >
            <BuildingIcon />
            Instituições
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/dashboard"
            className="flex gap-2 rounded-full px-4 py-2 font-small hover:bg-gray-50/10"
          >
            <UtensilsCrossed />
            Alimentos
          </Link>
        </li>
      </ul>
    </aside>
  );
}
