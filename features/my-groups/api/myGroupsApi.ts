import { baseApi } from "@/lib/redux/baseApi";
import {
  MyGroupsResponse,
  MyGroupsFilters,
  CategoriesResponse,
} from "../types/myGroupsTypes";
import { UserProfile } from "@/features/profile/api/userProfileApi";

export const myGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyGroups: builder.query<
      MyGroupsResponse,
      { role: string; filters: MyGroupsFilters }
    >({
      query: ({ role, filters }) => {
        const endpoint =
          role === "TEACHER" ? "/teachers/groups" : "/students/groups";

        const params = new URLSearchParams();

        if (filters.status) {
          params.append("status", filters.status);
        }

        if (filters.groupName) {
          params.append("groupName", filters.groupName);
        }

        if (filters.language) {
          params.append("language", filters.language);
        }

        if (filters.categoryId) {
          params.append("categoryId", filters.categoryId);
        }

        return {
          url: `${endpoint}?${params.toString()}`,
          meta: { authMode: "strict" },
        };
      },
      providesTags: ["Groups"],
    }),

    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/categories",
        meta: { authMode: "strict" },
      }),
    }),
  }),
});

export const { useGetMyGroupsQuery, useGetCategoriesQuery } = myGroupsApi;
