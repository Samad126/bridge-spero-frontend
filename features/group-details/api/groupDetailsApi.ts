import { baseApi } from "@/lib/redux/baseApi";
import {
  IsJoinedResponse,
  ScheduleResponse,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  SyllabusResponse
} from "../types/groupDetailsTypes";

export const groupDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkIsJoined: builder.query<IsJoinedResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/isJoined`,
        meta: { authMode: "strict" },
      }),
      providesTags: ["Groups"],
    }),

    getGroupSchedule: builder.query<ScheduleResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/schedule`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, groupId) => [
        { type: "Groups", id: `schedule-${groupId}` },
      ],
    }),

    createSchedule: builder.mutation<void, { groupId: number; data: CreateScheduleRequest }>({
      query: ({ groupId, data }) => ({
        url: `/groups/${groupId}/schedule`,
        method: "POST",
        body: data,
        meta: { authMode: "strict" },
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `schedule-${groupId}` },
      ],
    }),

    updateSchedule: builder.mutation<void, { scheduleId: number; data: UpdateScheduleRequest }>({
      query: ({ scheduleId, data }) => ({
        url: `/groups/schedule/${scheduleId}`,
        method: "PUT",
        body: data,
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups"],
    }),

    deleteSchedule: builder.mutation<void, number>({
      query: (scheduleId) => ({
        url: `/groups/schedule/${scheduleId}`,
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups"],
    }),

    getGroupSyllabus: builder.query<SyllabusResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/syllabus`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, groupId) => [
        { type: "Groups", id: `syllabus-${groupId}` },
      ],
    }),

    uploadSyllabus: builder.mutation<void, { groupId: number; file: File }>({
      query: ({ groupId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/groups/${groupId}/syllabus`,
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `syllabus-${groupId}` },
      ],
    }),

    deleteSyllabus: builder.mutation<void, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/syllabus`,
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: (result, error, groupId) => [
        { type: "Groups", id: `syllabus-${groupId}` },
      ],
    }),
  }),
});

export const {
  useCheckIsJoinedQuery,
  useGetGroupScheduleQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
  useGetGroupSyllabusQuery,
  useUploadSyllabusMutation,
  useDeleteSyllabusMutation,
} = groupDetailsApi;

