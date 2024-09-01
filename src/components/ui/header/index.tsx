import Image from "next/image";

export function Header() {
  return (
    <header className="flex pt-4">
      <div className="inline-flex items-center gap-4 ml-auto bg-glass rounded-full py-2 pl-8 pr-4">
        <div className="">
          <h2 className="text-sm">Fulano de tal</h2>
          <p className="text-xs font-light">Administrador</p>
        </div>
        <Image
          className="rounded-full w-[50px] h-[50px]"
          src="/assets/img/bglogin.jpg"
          alt="Avatar"
          width={50}
          height={50}
        />
      </div>
    </header>
  );
}
