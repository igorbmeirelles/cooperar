"use client";

import { useMemo } from "react";
import { UserInfo } from "../userInfo";
import { Link as PropLink, TValidLink } from "../sideNavigation/models/link";
import {
  BuildingIcon,
  LayoutDashboardIcon,
  PackageIcon,
  UtensilsCrossed,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const links = useMemo(
    () => [
      new PropLink("/home", "Dashboard", LayoutDashboardIcon),
      new PropLink("/controle", "Controle", PackageIcon),
      new PropLink("/culturas", "Culturas", UtensilsCrossed),
      new PropLink("/instituicoes", "Instituições", BuildingIcon),
    ],
    []
  );

  const path = usePathname() as TValidLink;

  return (
    <header
      className="flex-col-reverse md:flex-row gap-4 flex pt-4 items-center"
      data-cy="header"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:hidden">
        {links.map((link) => (
          <Link
            href={link.href}
            className={`grid grid-flow-col gap-2 px-4 py-2 rounded-full ${
              link.href == path ? "bg-primary text-white" : "shadow-xl"
            }`}
            key={link.href}
          >
            <link.icon />
            {link.title}
          </Link>
        ))}
      </div>

      <UserInfo.Root>
        <UserInfo.NameRoleContainer>
          <UserInfo.Name>Cooperar</UserInfo.Name>
          <UserInfo.Role>Administrador</UserInfo.Role>
        </UserInfo.NameRoleContainer>
        <UserInfo.Avatar
          src=""
          alt="Imagem de usuário"
        />
      </UserInfo.Root>
    </header>
  );
}
