// example api RTK query

import { baseApi } from "@/lib/redux/baseApi";

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: ({ authMode }) => ({
        url: "/me",
        meta: {
          authMode,
        },
      }),
    }),
  }),
});

export const { useGetUserProfileQuery } = userProfileApi;
