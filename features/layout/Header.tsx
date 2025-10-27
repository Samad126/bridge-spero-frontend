"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="">
        <div className="container mx-auto flex items-center h-[62px] border-b border-gray-light">
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
          <div className="w-full max-w-[62px] h-full justify-center flex items-center sm:max-w-full sm:justify-start border-r border-gray-light">
            <button
              className="w-full flex justify-center cursor-pointer h-full sm:hidden"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Image
                src={"/search.svg"}
                alt="search icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px] h-full"
              />
            </button>

            <label
              className="hidden sm:flex justify-center cursor-text h-full pl-[20px] pr-[12px]"
              htmlFor="search"
            >
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
              className="outline-none placeholder:text-secondary h-full w-full pr-[20px] hidden sm:inline-block"
              id="search"
            />
          </div>
          <button className="w-full max-w-[62px] flex justify-center h-full border-r border-gray-light xl:hidden">
            <Image
              src={"/menu.svg"}
              alt="menu icon"
              width={22}
              height={22}
              loading="eager"
              className="min-w-[22px] min-h-[22px] h-full"
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
                  className="h-full text-center flex items-center justify-center border-r border-gray-light"
                  href={"/register"}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {isSearchOpen && null}
    </>
  );
}

export default Header;
