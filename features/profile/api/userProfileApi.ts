// example api RTK query

import { baseApi } from "@/lib/redux/baseApi";

export interface UserProfile {
  id: number;
  role: "TEACHER" | "USER";
  name: string;
  surname: string;
  email: string;
  imageUrl?: string | null;
  // Add other fields as needed based on backend response
}

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/me",
        meta: { authMode: "strict" },
      }),
      providesTags: ["User"],
    }),

    getUserProfileOptional: builder.query<UserProfile, void>({
      query: () => ({
        url: "/me",
        meta: { authMode: "optional" },
      }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userProfileApi.util.upsertQueryData(
              "getUserProfile",
              undefined,
              data
            )
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetUserProfileQuery, useGetUserProfileOptionalQuery } =
  userProfileApi;
