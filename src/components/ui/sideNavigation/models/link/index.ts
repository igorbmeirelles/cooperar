import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TValidNames =
  | "Dashboard"
  | "Controle de fornecimento"
  | "Tabela per capta"
  | "Instituições"
  | "Culturas"
  | "Sair";

export type TValidLink =
  | "/instituicoes"
  | "/culturas"
  | "/tabela-per-capta"
  | "/"
  | "/login"
  | "/controle"
  | "/percapta"
  | "/home";

export class Link {
  constructor(
    public href: TValidLink,
    public title: TValidNames,
    public icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  ) {
    this.href = href;
    this.title = title;
  }

  isActive(aPath: TValidLink | null) {
    return aPath == this.href;
  }
}
