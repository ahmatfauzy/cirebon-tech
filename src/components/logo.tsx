import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={"/next.svg"}
        width={40}
        height={40}
        alt="init"
        className={className}
      />{" "}
      <span className="font-mono  font-bold ">init</span>
    </div>
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={"/next.svg"}
      width={40}
      height={40}
      alt="init"
      className={className}
    />
  );
};
