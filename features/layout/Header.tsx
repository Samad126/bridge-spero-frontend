"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header>
        <div className="container relative mx-auto flex items-center h-[62px] border-b border-gray-light">
          <Link
            href={"/"}
            className="flex items-center gap-[7px] pl-[20px] w-full min-w-[230px] border-x border-gray-light h-full md:min-w-[250px] md:pl-[30px]"
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
          <div className="w-full max-w-[62px] h-full justify-center flex items-center md:max-w-full md:justify-start border-r border-gray-light">
            <button
              className="w-full flex justify-center items-center cursor-pointer h-full md:hidden"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Image
                src={"/search.svg"}
                alt="search icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </button>
            <label
              className="hidden md:flex justify-center items-center cursor-text h-full pl-[20px] pr-[12px]"
              htmlFor="search"
            >
              <Image
                src={"/search.svg"}
                alt="search icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </label>
            <input
              type="search"
              placeholder="Search"
              className="outline-none placeholder:text-secondary h-full w-full pr-[20px] hidden md:inline-block"
              id="search"
            />
          </div>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-full max-w-[62px] flex justify-center items-center h-full border-r border-gray-light xl:hidden"
          >
            <Image
              src={isMenuOpen ? "/close.svg" : "/menu.svg"}
              alt="menu icon"
              width={22}
              height={22}
              loading="eager"
              className="min-w-[22px] min-h-[22px]"
            />
          </button>
          <nav className="h-full">
            <ul className="hidden xl:flex h-full items-center">
              <li className="w-full h-full min-w-[165px]">
                <Link
                  className="h-full text-center flex items-center justify-center border-r border-gray-light"
                  href={"/about"}
                >
                  About
                </Link>
              </li>
              <li className="w-full h-full min-w-[165px]">
                <Link
                  className="h-full text-center flex items-center justify-center border-r border-gray-light"
                  href={"/explore"}
                >
                  Explore
                </Link>
              </li>
              <li className="w-full h-full min-w-[165px]">
                <Link
                  className="h-full text-center flex items-center justify-center border-r border-gray-light"
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>
              <li className="w-full h-full min-w-[102px]">
                <Link
                  className="h-full text-center flex items-center justify-center border-r border-gray-light"
                  href={"/login"}
                >
                  Login
                </Link>
              </li>
              <li className="w-full h-full min-w-[102px]">
                <Link
                  className="h-full text-center flex items-center justify-center border-r border-gray-light bg-secondary text-custom-white"
                  href={"/register"}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
          {isMenuOpen && (
            <div className="absolute right-0 top-full w-full sm:max-w-[390px] xl:hidden border-l bg-white border-b border-t border-gray-light">
              <nav>
                <ul className="flex flex-col" id="topMenu">
                  <li>
                    <Link className="block p-[20px] border-b border-gray-light" href={"/about"}>About</Link>
                  </li>
                  <li>
                    <Link className="block p-[20px] border-b border-gray-light" href={"/explore"}>Explore</Link>
                  </li>
                  <li>
                    <Link className="block p-[20px] border-b border-gray-light" href={"/contact"}>Contact</Link>
                  </li>
                </ul>
                <ul className="flex justify-between" id="bottomMenu">
                  <li className="flex-1">
                    <Link className="block py-[20px] text-center" href={"/login"}>Login</Link>
                  </li>
                  <li className="flex-1">
                    <Link className="block py-[20px] bg-secondary text-custom-white text-center" href={"/register"}>Register</Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
      {isSearchOpen && null}
    </>
  );
}

export default Header;
