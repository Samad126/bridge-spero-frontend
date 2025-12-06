import { baseApi } from "@/lib/redux/baseApi";
import { IsJoinedResponse } from "../types/groupDetailsTypes";

export const groupDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkIsJoined: builder.query<IsJoinedResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/isJoined`,
        meta: { authMode: "strict" },
      }),
      providesTags: ["Groups"],
    }),
  }),
});

export const { useCheckIsJoinedQuery } = groupDetailsApi;

