"use client";

import { useQueryStates, parseAsInteger } from "nuqs";
import { useTransition } from "react";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalElements,
}: PaginationProps) {
  const [isPending, startTransition] = useTransition();
  const [, setFilters] = useQueryStates(
    {
      pageNumber: parseAsInteger.withDefault(0),
    },
    {
      history: "push",
      shallow: false,
      startTransition,
    }
  );

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setFilters({ pageNumber: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate page range to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages - 2, currentPage + 1);

      // Adjust if near the beginning
      if (currentPage <= 2) {
        endPage = 3;
      }

      // Adjust if near the end
      if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
      }

      // Add ellipsis if needed
      if (startPage > 1) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-[24px] py-[32px]">
      <div className="text-tertiary text-[14px]">
        Showing page {currentPage + 1} of {totalPages} ({totalElements} total teachers)
      </div>
      <div className="flex items-center gap-[8px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0 || isPending}
          className="w-[40px] h-[40px] border border-gray-light flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          <Image
            src="/chevron-left.svg"
            width={22}
            height={22}
            alt="previous"
            className="rotate-0"
          />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-[12px] text-tertiary">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={isPending}
              className={`
                w-[40px] h-[40px] font-medium border-gray-light flex items-center justify-center cursor-pointer transition-colors
                ${
                  currentPage === pageNum
                    ? "bg-secondary text-white"
                    : "text-secondary hover:bg-gray-100"
                }
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {pageNum + 1}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || isPending}
          className="w-[40px] h-[40px] border border-gray-light flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          <Image
            src="/arrow-right.svg"
            width={22}
            height={22}
            alt="next"
          />
        </button>
      </div>
    </div>
  );
}
