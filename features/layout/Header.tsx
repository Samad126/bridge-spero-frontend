import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="">
      <div className="container mx-auto flex items-center h-[62px] border-b border-gray-light">
        <Link
          href={"/"}
          className="flex items-center gap-[7px] pl-[30px] w-full min-w-[170px] max-w-[369px] border-x border-gray-light h-full md:min-w-[250px]"
        >
          <div>
            <div className="relative w-[46.5px] h-[21px] md:w-[80px] md:h-[36px]">
              <Image
                src={"/logo.svg"}
                alt="main logo"
                fill
                loading="eager"
                sizes="(max-width: 768px) 46.5px, 80px"
              />
            </div>
          </div>
          <p className="font-bold text-[22px]">
            Bridge<span className="text-primary">Spero</span>
          </p>
        </Link>
        <div className="w-full h-full max-w-[372px] flex items-center">
          <label className="cursor-text pr-[12px] pl-[20px] h-full" htmlFor="search">
            <Image
              src={"/search.svg"}
              alt="search icon"
              width={22}
              height={22}
              loading="eager"
              className="min-w-[22px] min-h-[22px] h-full"
            />
          </label>
          <input
            type="search"
            placeholder="Search"
            className="outline-none placeholder:text-secondary h-full w-full pr-[20px]"
            id="search"
          />
        </div>
        <nav className="w-full h-full">
          <ul className="flex h-full items-center">
            <li className="w-full h-full min-w-[165px]">
              <Link className="h-full text-center flex items-center justify-center border-r border-l border-gray-light" href={"/about"}>
                About
              </Link>
            </li>
            <li className="w-full h-full min-w-[165px]">
              <Link className="h-full text-center flex items-center justify-center border-r border-gray-light" href={"/explore"}>
                Explore
              </Link>
            </li>
            <li className="w-full h-full min-w-[165px]">
              <Link className="h-full text-center flex items-center justify-center border-r border-gray-light" href={"/contact"}>
                Contact
              </Link>
            </li>
            <li className="w-full h-full min-w-[102px]">
              <Link className="h-full text-center flex items-center justify-center border-r border-gray-light" href={"/login"}>
                Login
              </Link>
            </li>
            <li className="w-full h-full min-w-[102px]">
              <Link className="h-full text-center flex items-center justify-center border-r border-gray-light" href={"/register"}>
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
