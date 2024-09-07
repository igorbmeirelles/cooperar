import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TValidLinks =
  | "Dashboard"
  | "Controle de fornecimento"
  | "Tabela per capta"
  | "Instituições"
  | "Culturas";

export class Link {
  constructor(
    public href: string,
    public title: TValidLinks,
    public icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  ) {
    this.href = href;
    this.title = title;
  }

  isActive(aPath: TValidLinks | null) {
    return aPath == this.href;
  }
}
