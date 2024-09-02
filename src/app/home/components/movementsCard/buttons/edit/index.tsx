import { Pencil } from "lucide-react";
import Link, { LinkProps } from "next/link";

interface IProps extends LinkProps {
  className?: string;
}

export function EditButton({ className = "", ...props }: IProps) {
  return (
    <Link
      className={`inline-flex p-2 rounded-full bg-white hover:brightness-90 transition-all ${className}`}
      {...props}
    >
      <Pencil className="w-4 h-4" />
    </Link>
  );
}
