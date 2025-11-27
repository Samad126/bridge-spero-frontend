import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-[7px] pl-[16.25px] w-full min-w-[230px] border-x border-gray-light h-full lg:min-w-[250px] lg:pl-[25px]"
    >
      <div className="relative w-[54px] h-[27px] lg:w-[72px] lg:h-[36px]">
        <Image
          src="/logo.svg"
          alt="main logo"
          fill
          loading="eager"
          sizes="(max-width: 768px) 54px, 72px"
        />
      </div>
      <p className="font-bold text-[22px]">
        Bridge<span className="text-primary">Spero</span>
      </p>
    </Link>
  );
}
