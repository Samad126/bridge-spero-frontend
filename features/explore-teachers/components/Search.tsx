"use client";

import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";

function Search() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useQueryStates(
    {
      name: parseAsString.withDefault(""),
      pageNumber: parseAsInteger.withDefault(0),
    },
    {
      history: "push",
      shallow: false,
      startTransition,
    }
  );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "groups") {
      router.push("/explore-groups");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    setFilters({
      name: name || "",
      pageNumber: 0,
    });
  };

  return (
    <div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto gap-[24px] max-w-[684px] xxl:flex-row xxl:gap-[12px]"
        >
          <div className="flex flex-1 flex-col xxl:flex-row">
            <p className="flex-1 xxl:max-w-[123px] w-full">
              <select
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-secondary"
                onChange={handleTypeChange}
                value="teachers"
              >
                <option value="groups">Groups</option>
                <option value="teachers">Teachers</option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[315px] w-full">
              <input
                type="text"
                name="name"
                placeholder="Teacher Name"
                className="border border-gray-light h-[46px] px-[12px] w-full outline-0 border-spacing-x-2 inline-block placeholder:text-tertiary"
                defaultValue={filters.name}
              />
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
