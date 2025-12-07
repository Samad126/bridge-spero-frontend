import { baseApi } from "@/lib/redux/baseApi";
import {
  IsJoinedResponse,
  ScheduleResponse,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  SyllabusResponse,
  RecordingsResponse,
  ResourcesResponse,
  MembersResponse
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

    getGroupRecordings: builder.query<RecordingsResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/recordings`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, groupId) => [
        { type: "Groups", id: `recordings-${groupId}` },
      ],
    }),

    uploadRecording: builder.mutation<void, { groupId: number; file: File; name?: string }>({
      query: ({ groupId, file, name }) => {
        const formData = new FormData();
        formData.append("file", file);
        if (name) {
          formData.append("name", name);
        }
        return {
          url: `/groups/${groupId}/recordings`,
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `recordings-${groupId}` },
      ],
    }),

    getGroupResources: builder.query<ResourcesResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/resources`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, groupId) => [
        { type: "Groups", id: `resources-${groupId}` },
      ],
    }),

    uploadResource: builder.mutation<void, { groupId: number; file: File; name?: string }>({
      query: ({ groupId, file, name }) => {
        const formData = new FormData();
        formData.append("file", file);
        if (name) {
          formData.append("name", name);
        }
        return {
          url: `/groups/${groupId}/resources`,
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `resources-${groupId}` },
      ],
    }),

    deleteResource: builder.mutation<void, { groupId: number; resourceId: number }>({
      query: ({ resourceId }) => ({
        url: `/resources/${resourceId}`,
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `resources-${groupId}` },
      ],
    }),

    getGroupMembers: builder.query<MembersResponse, { groupId: number; fullName?: string }>({
      query: ({ groupId, fullName }) => {
        const params = new URLSearchParams();
        if (fullName) {
          params.append("fullName", fullName);
        }
        const queryString = params.toString();
        return {
          url: `/groups/${groupId}/members${queryString ? `?${queryString}` : ""}`,
          meta: { authMode: "optional" },
        };
      },
      providesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `members-${groupId}` },
      ],
      keepUnusedDataFor: 0,
    }),

    deleteMember: builder.mutation<void, { groupId: number; studentId: number }>({
      query: ({ groupId, studentId }) => ({
        url: `/groups/${groupId}/members/${studentId}`,
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Groups", id: `members-${groupId}` },
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
  useGetGroupRecordingsQuery,
  useUploadRecordingMutation,
  useGetGroupResourcesQuery,
  useUploadResourceMutation,
  useDeleteResourceMutation,
  useGetGroupMembersQuery,
  useDeleteMemberMutation,
} = groupDetailsApi;

