"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className = "" }: SearchInputProps) {
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (value) {
        router.push(`/explore?search=${encodeURIComponent(value)}`);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div className={`w-full h-full border-r border-gray-light ${className}`}>
      <label
        className="flex justify-center items-center cursor-text h-full pl-[20px] pr-[12px]"
        htmlFor="header-search"
      >
        <Image
          src="/search.svg"
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
        id="header-search"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
