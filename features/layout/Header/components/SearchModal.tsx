"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/explore?search=${encodeURIComponent(trimmed)}`);
      onClose();
      setQuery("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-100 flex items-start justify-center pt-[100px]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[600px] mx-4 border border-gray-light shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center border-b border-gray-light">
            <div className="flex justify-center items-center h-full pl-[20px] pr-[12px]">
              <Image
                src="/search.svg"
                alt="search icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </div>
            <input
              type="search"
              placeholder="Search and press Enter..."
              className="outline-none placeholder:text-secondary h-full w-full py-[20px] pr-[20px] text-[18px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              onClick={onClose}
              className="px-[20px] py-[20px] hover:bg-gray-100"
              aria-label="Close search"
            >
              <Image
                src="/close.svg"
                alt="close"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
