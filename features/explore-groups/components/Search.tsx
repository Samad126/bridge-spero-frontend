"use client";

import { useQueryStates, parseAsString } from "nuqs";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { Language } from "@/features/group-form/types/groupFormTypes";

function Search() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useQueryStates(
    {
      groupName: parseAsString.withDefault(""),
      language: parseAsString.withDefault(""),
    },
    {
      history: "push",
      shallow: false,
      startTransition,
    }
  );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "teachers") {
      router.push("/explore-teachers");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const groupName = formData.get("groupName") as string;
    const language = formData.get("language") as string;

    setFilters({
      groupName: groupName || "",
      language: language || "",
    });
  };

  return (
    <div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto gap-[24px] max-w-[808px] xxl:flex-row xxl:gap-[12px]"
        >
          <div className="flex flex-1 flex-col xxl:flex-row">
            <p className="flex-1 xxl:max-w-[109px] w-full">
              <select
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-secondary"
                onChange={handleTypeChange}
                value="groups"
              >
                <option value="groups">Groups</option>
                <option value="teachers">Teachers</option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[315px] w-full">
              <input
                type="text"
                name="groupName"
                placeholder="Group Name"
                className="border border-gray-light h-[46px] px-[12px] w-full outline-0 border-spacing-x-2 inline-block placeholder:text-tertiary"
                defaultValue={filters.groupName}
              />
            </p>
            <p className="flex-1 xxl:max-w-[315px] w-full">
              <select
                name="language"
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary"
                defaultValue={filters.language}
              >
                <option value={Language.AZERBAIJANI}>Azerbaijani</option>
                <option value={Language.ENGLISH}>English</option>
                <option value={Language.RUSSIAN}>Russian</option>
                <option value={Language.TURKISH}>Turkish</option>
              </select>
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="block text-center py-[11px] bg-secondary text-white h-[46px] xxl:w-full xxl:max-w-[234px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
