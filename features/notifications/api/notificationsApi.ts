import { baseApi } from "@/lib/redux/baseApi";
import { JoinNotificationsResponse } from "../types/notificationTypes";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherNotifications: builder.query<JoinNotificationsResponse, number>({
      query: (teacherId) => ({
        url: `/teachers/${teacherId}/join/notifications`,
        meta: { authMode: "strict" },
      }),
      providesTags: ["Groups"],
    }),

    acceptJoinRequest: builder.mutation<void, number>({
      query: (requestId) => ({
        url: `/teachers/join/accept/${requestId}`,
        method: "PATCH",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups", "Dashboard"],
    }),

    declineJoinRequest: builder.mutation<void, number>({
      query: (requestId) => ({
        url: `/teachers/join/decline/${requestId}`,
        method: "PATCH",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups", "Dashboard"],
    }),

    cancelJoinRequest: builder.mutation<void, number>({
      query: (groupId) => ({
        url: `/users/join/${groupId}`,
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups", "Dashboard"],
    }),
  }),
});

export const {
  useGetTeacherNotificationsQuery,
  useAcceptJoinRequestMutation,
  useDeclineJoinRequestMutation,
  useCancelJoinRequestMutation,
} = notificationsApi;
