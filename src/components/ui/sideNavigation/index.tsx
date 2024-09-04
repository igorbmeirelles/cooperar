"use client";

import {
  BuildingIcon,
  LayoutDashboardIcon,
  PackageIcon,
  TableIcon,
  UtensilsCrossed,
} from "lucide-react";
import { Header } from "./header";
import { NavLink } from "./navLink";
import { LinkWrapper } from "./linkWrapper";
import { NavContainer } from "./navContainer";
import { Root } from "./root";
import { Link } from "./models/link";
import { useMemo } from "react";

export function SideNavigation() {
  const links = useMemo(
    () => [
      new Link("/dashboard", "Dashboard", true, LayoutDashboardIcon),
      new Link("/controle", "Controle de fornecimento", false, PackageIcon),
      new Link("/percapta", "Tabela per capta", false, TableIcon),
      new Link("/instituicoes", "Instituições", false, BuildingIcon),
      new Link("/culturas", "Culturas", false, UtensilsCrossed),
    ],
    []
  );

  return (
    <Root data-cy="sidebar">
      <Header />
      <NavContainer>
        {links.map((link) => (
          <LinkWrapper className="mb-2" key={link.href}>
            <NavLink href={link.href} active={link.active}>
              <link.icon />
              {link.title}
            </NavLink>
          </LinkWrapper>
        ))}
      </NavContainer>
    </Root>
  );
}
