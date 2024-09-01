import { Cooperar } from "@/components/icons/logo/cooperar";
import { Logo } from "@/components/icons/logo/logo";

export function Header() {
  return (
    <div className="flex gap-2 items-center justify-center mb-8">
      <Logo />
      <Cooperar />
    </div>
  );
}
