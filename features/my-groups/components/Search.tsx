"use client";

import { useQueryStates, parseAsString } from "nuqs";
import { FormEvent, useTransition } from "react";
import { useGetCategoriesQuery } from "../api/myGroupsApi";

function Search() {
  const [isPending, startTransition] = useTransition();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [filters, setFilters] = useQueryStates(
    {
      groupName: parseAsString.withDefault(""),
      language: parseAsString.withDefault(""),
      status: parseAsString.withDefault("ACTIVE"),
      categoryId: parseAsString.withDefault(""),
    },
    {
      history: "push",
      shallow: false,
      startTransition,
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const groupName = formData.get("groupName") as string;
    const language = formData.get("language") as string;
    const status = formData.get("status") as string;
    const categoryId = formData.get("categoryId") as string;

    setFilters({
      groupName: groupName || "",
      language: language ? language.toUpperCase() : "",
      status: status || "ACTIVE",
      categoryId: categoryId || "",
    });
  };

  return (
    <div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto gap-[24px] max-w-[1052px] xxl:flex-row xxl:gap-[12px]"
        >
          <div className="flex flex-1 flex-col xxl:flex-row">
            <p className="flex-1 xxl:max-w-[268.67px] w-full">
              <input
                type="text"
                name="groupName"
                placeholder="Group Name"
                className="border border-gray-light h-[46px] px-[12px] w-full outline-0 border-spacing-x-2 inline-block placeholder:text-tertiary"
                defaultValue={filters.groupName}
              />
            </p>
            <p className="flex-1 xxl:max-w-[268.67px] w-full">
              <select
                name="language"
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary"
                defaultValue={filters.language.toLowerCase()}
              >
                <option value="">Language</option>
                <option value="azerbaijani">Azerbaijani</option>
                <option value="english">English</option>
                <option value="russian">Russian</option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[268.67px] w-full">
              <select
                name="status"
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary"
                defaultValue={filters.status}
              >
                <option value="">Status</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[268.67px] w-full">
              <select
                name="categoryId"
                className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary"
                defaultValue={filters.categoryId}
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
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