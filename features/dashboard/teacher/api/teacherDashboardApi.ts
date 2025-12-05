import { baseApi } from "@/lib/redux/baseApi";
import { TeacherDashboardResponse, TeacherScheduleResponse } from "../types/dashboardTypes";

export const teacherDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherDashboard: builder.query<TeacherDashboardResponse, void>({
      query: () => ({
        url: "/teachers/dashboard",
        meta: { authMode: "strict" },
      }),
      providesTags: ["Dashboard"],
    }),

    getTeacherSchedule: builder.query<TeacherScheduleResponse, void>({
      query: () => ({
        url: "/teachers/schedule",
        meta: { authMode: "strict" },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetTeacherDashboardQuery,
  useGetTeacherScheduleQuery,
} = teacherDashboardApi;

