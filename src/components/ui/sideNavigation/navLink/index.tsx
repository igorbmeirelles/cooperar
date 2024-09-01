import Link, { LinkProps } from "next/link";

interface IProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function NavLink({
  children,
  className = "",
  active = false,
  ...props
}: IProps) {
  return (
    <Link
      className={`flex gap-2 rounded-full px-4 py-2 ${
        active ? "text-white" : ""
      }  font-small  ${active ? "bg-primary" : "hover:bg-gray-50/10"}`}
      {...props}
    >
      {children}
    </Link>
  );
}
