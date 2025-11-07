"use client";

import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-col justify-between bg-[url(/footerlogo.svg)] bg-cover bg-center bg-gray-light overflow-hidden bg-no-repeat pt-[100px]">
      <div className="container container-footer">
        <h3 className="text-[32px] leading-[130%] mb-[16px] text-center text-primary tracking-[0%] lg:text-[48px] xxl:text-[54px]">
          Ready To Transform Education ?
        </h3>
        <p className="text-center text-secondary mt-[16px] mb-[32px] lg:text-[18px] xxl:text-[20px] lg:mb-[54px]">
          Be part of the movement redefining how students learn, grow, and
          succeed
        </p>
        <div className="flex flex-col gap-[12px] max-w-[424px] mx-auto lg:flex-row lg:gap-[24px]">
          <Link
            className="inline-block py-[12px] flex-1 bg-secondary text-white text-center"
            href={"/"}
          >
            Become a Student
          </Link>
          <Link
            className="inline-block py-[12px] flex-1 border border-secondary text-secondary text-center"
            href={"/"}
          >
            Become a Teacher
          </Link>
        </div>
        <div className="flex flex-col justify-between text-center items-center text-secondary my-[60px] gap-[48px] lg:flex-row lg:my-[80px] xxl:my-[100px] xxl:px-[14px] lg:text-left">
          <ul className="space-y-[12px]">
            <li>Azerbaijan, Baku</li>
            <li>someone@gmail.com</li>
            <li>+994558888888</li>
          </ul>
          <ul className="space-y-[12px]">
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Explore</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
          <ul className="space-y-[12px]">
            <li>
              <Link className="flex items-center gap-[12px]" href={"/"}>
                <Image
                  src="/instagram.svg"
                  alt="instagram icon"
                  width={22}
                  height={22}
                />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-[12px]" href={"/"}>
                <Image
                  src="/linkedin.svg"
                  alt="linkedin icon"
                  width={22}
                  height={22}
                />
                <span>Linkedin</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-[12px]" href={"/"}>
                <Image
                  src="/facebook.svg"
                  alt="Facebook icon"
                  width={22}
                  height={22}
                />
                <span>Facebook</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative h-[60px] md:h-[100px] lg:h-[120px] xxl:h-[150px]">
        <p className="absolute bottom-0 left-0 right-0 text-[clamp(3rem,15vw,15rem)] text-white text-center font-bold leading-[0.5] select-none pointer-events-none">
          BridgeSpero
        </p>
      </div>
    </footer>
  );
}

export default Footer;
