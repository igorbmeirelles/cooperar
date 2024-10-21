import { Cooperar } from "@/components/icons/logo/cooperar";
// import { Logo } from "@/components/icons/logo/logo";
import Logo from "../../../../../public/assets/img/logo.png";
import Image from "next/image";

export function Header() {
  return (
    <div className="flex gap-2 items-center justify-center mb-8">
      <Image src={Logo} alt="logo" width="180" />
      {/* <Cooperar /> */}
    </div>
  );
}
