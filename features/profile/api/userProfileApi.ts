// example api RTK query

import { baseApi } from "@/lib/redux/baseApi";

export interface UserProfile {
  id: number;
  role: "TEACHER" | "USER";
  name: string;
  surname: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  bio?: string | null;
  interestCategoryIds: number[];
  imageUrl?: string | null;
  profilePictureUrl?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/users/me",
        meta: { authMode: "strict" },
      }),
      providesTags: ["User"],
    }),

    getUserProfileOptional: builder.query<UserProfile, void>({
      query: () => ({
        url: "/users/me",
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
