import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ValidLinks =
  | "Dashboard"
  | "Controle de fornecimento"
  | "Tabela per capta"
  | "Instituições"
  | "Culturas";

export class Link {
  constructor(
    public href: string,
    public title: ValidLinks,
    public active: boolean,
    public icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  ) {
    this.href = href;
    this.title = title;
    this.active = active;
  }
}
