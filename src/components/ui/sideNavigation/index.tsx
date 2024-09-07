"use client";
import {
  BuildingIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PackageIcon,
  TableIcon,
  UtensilsCrossed,
} from "lucide-react";
import { Header } from "./header";
import { NavLink } from "./navLink";
import { LinkWrapper } from "./linkWrapper";
import { NavContainer } from "./navContainer";
import { Root } from "./root";
import { Link, TValidLink } from "./models/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/_context/auth";

export function SideNavigation() {
  const links = useMemo(
    () => [
      new Link("/", "Dashboard", LayoutDashboardIcon),
      new Link("/controle", "Controle de fornecimento", PackageIcon),
      new Link("/percapta", "Tabela per capta", TableIcon),
      new Link("/instituicoes", "Instituições", BuildingIcon),
      new Link("/culturas", "Culturas", UtensilsCrossed),
    ],
    []
  );

  const SignOutLink = new Link("/login", "Sair", LogOutIcon);

  const path = usePathname() as TValidLink;

  const { signOut } = useAuth();

  return (
    <Root data-cy="sidebar" className="flex flex-col">
      <Header />
      <NavContainer>
        {links.map((link) => (
          <LinkWrapper className="mb-2" key={link.href}>
            <NavLink href={link.href} active={link.isActive(path)}>
              <link.icon />
              {link.title}
            </NavLink>
          </LinkWrapper>
        ))}
      </NavContainer>
      <NavLink onClick={signOut} href={SignOutLink.href} className="mt-auto">
        <SignOutLink.icon />
        {SignOutLink.title}
      </NavLink>
    </Root>
  );
}
