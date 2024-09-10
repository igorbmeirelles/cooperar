import Image, { ImageProps } from "next/image";

interface IProps extends ImageProps {}

export function Avatar({ className = "", ...props }: IProps) {
  return (
    <Image
      className={`rounded-full w-[50px] h-[50px] ${className}`}
      width={50}
      height={50}
      {...props}
      alt="User Avatar"
    />
  );
}
