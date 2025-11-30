// example api RTK query

import { baseApi } from "@/lib/redux/baseApi";

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/me",
        meta: { authMode: "strict" },
      }),
      providesTags: ["User"],
    }),

    getUserProfileOptional: builder.query({
      query: () => ({
        url: "/me",
        meta: { authMode: "optional" },
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
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

export const { useGetUserProfileQuery } = userProfileApi;
