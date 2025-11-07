"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky z-50 top-[24px] w-full">
        <div className="container container-header mx-auto">
          <div className="relative flex items-center h-[62px] border-y border-gray-light bg-white">
            <Link
              href={"/"}
              className="flex items-center gap-[7px] pl-[16.25px] w-full min-w-[230px] border-x border-gray-light h-full lg:min-w-[250px] lg:pl-[25px]"
            >
              <div>
                <div className="relative w-[54px] h-[27px] lg:w-[72px] lg:h-[36px]">
                  <Image
                    src={"/logo.svg"}
                    alt="main logo"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 54px, 72px"
                  />
                </div>
              </div>
              <p className="font-bold text-[22px]">
                Bridge<span className="text-primary">Spero</span>
              </p>
            </Link>
            <div className="hidden w-full h-full lg:flex items-center border-r border-gray-light">
              <label
                className="flex justify-center items-center cursor-text h-full pl-[20px] pr-[12px]"
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
                className="outline-none placeholder:text-secondary h-full w-full pr-[20px]"
                id="search"
              />
            </div>
            <button
              className="w-full max-w-[62px] border-r border-gray-light flex justify-center items-center cursor-pointer h-full lg:hidden"
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
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-full max-w-[62px] flex justify-center items-center h-full border-r border-gray-light xxl:hidden"
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
              <ul className="hidden xxl:flex h-full items-center">
                <li className="w-full h-full min-w-[165px]">
                  <Link
                    className="h-full text-center flex items-center justify-center border-r border-gray-light"
                    href={"/"}
                  >
                    About
                  </Link>
                </li>
                <li className="w-full h-full min-w-[165px]">
                  <Link
                    className="h-full text-center flex items-center justify-center border-r border-gray-light"
                    href={"/"}
                  >
                    Explore
                  </Link>
                </li>
                <li className="w-full h-full min-w-[165px]">
                  <Link
                    className="h-full text-center flex items-center justify-center border-r border-gray-light"
                    href={"/"}
                  >
                    Contact
                  </Link>
                </li>
                <li className="w-full h-full min-w-[102px]">
                  <Link
                    className="h-full text-center flex items-center justify-center border-r border-gray-light"
                    href={"/"}
                  >
                    Login
                  </Link>
                </li>
                <li className="w-full h-full min-w-[102px]">
                  <Link
                    className="h-full text-center flex items-center justify-center border-r border-gray-light bg-secondary text-custom-white"
                    href={"/"}
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
            {isMenuOpen && (
              <div className="absolute right-0 top-full w-full sm:max-w-[390px] xxl:hidden border-x bg-white border-b border-t border-gray-light">
                <nav>
                  <ul className="flex flex-col" id="topMenu">
                    <li>
                      <Link
                        className="block p-[20px] border-b border-gray-light"
                        href={"/"}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block p-[20px] border-b border-gray-light"
                        href={"/"}
                      >
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block p-[20px] border-b border-gray-light"
                        href={"/"}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                  <ul className="flex justify-between" id="bottomMenu">
                    <li className="flex-1">
                      <Link
                        className="block py-[20px] text-center"
                        href={"/"}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="flex-1">
                      <Link
                        className="block py-[20px] bg-secondary text-custom-white text-center"
                        href={"/"}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
      {isSearchOpen && null}
    </>
  );
}

export default Header;
