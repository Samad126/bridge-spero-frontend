import { baseApi } from "@/lib/redux/baseApi";
import { DashboardResponse, ScheduleResponse } from "../types/dashboardTypes";

export const studentDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/users/dashboard",
        meta: { authMode: "strict" },
      }),
      providesTags: ["Dashboard"],
    }),

    getStudentSchedule: builder.query<ScheduleResponse, void>({
      query: () => ({
        url: "/users/schedule",
        meta: { authMode: "strict" },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetStudentDashboardQuery,
  useGetStudentScheduleQuery,
} = studentDashboardApi;

