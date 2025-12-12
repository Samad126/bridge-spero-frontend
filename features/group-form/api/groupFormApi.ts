import { baseApi } from "@/lib/redux/baseApi";
import { CreateGroupPayload, CreateGroupResponse } from "../types/groupFormTypes";

export const groupFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroup: builder.query<CreateGroupResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, groupId) => [
        { type: "Groups", id: groupId },
      ],
    }),

    createGroup: builder.mutation<CreateGroupResponse, CreateGroupPayload>({
      query: (payload) => {
        // Create FormData
        const formData = new FormData();

        // Append required fields
        formData.append("name", payload.name);
        formData.append("categoryId", payload.categoryId.toString());
        formData.append("language", payload.language);
        formData.append("startDate", payload.startDate);
        formData.append("durationInMonths", payload.durationInMonths.toString());
        formData.append("maxStudents", payload.maxStudents.toString());
        formData.append("price", payload.price.toString());

        // Append optional fields
        if (payload.description) {
          formData.append("description", payload.description);
        }

        if (payload.groupImage) {
          formData.append("image", payload.groupImage);
        }

        if (payload.syllabus) {
          formData.append("syllabus", payload.syllabus);
        }

        return {
          url: "/groups",
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["Dashboard", "Groups"],
    }),

    updateGroup: builder.mutation<CreateGroupResponse, { groupId: number; payload: CreateGroupPayload }>({
      query: ({ groupId, payload }) => {
        // Create FormData
        const formData = new FormData();

        // Append required fields
        formData.append("name", payload.name);
        formData.append("categoryId", payload.categoryId.toString());
        formData.append("language", payload.language);
        formData.append("startDate", payload.startDate);
        formData.append("durationInMonths", payload.durationInMonths.toString());
        formData.append("maxStudents", payload.maxStudents.toString());
        formData.append("price", payload.price.toString());

        // Append optional fields
        if (payload.description) {
          formData.append("description", payload.description);
        }

        if (payload.groupImage) {
          formData.append("image", payload.groupImage);
        }

        if (payload.syllabus) {
          formData.append("syllabus", payload.syllabus);
        }

        return {
          url: `/groups/${groupId}`,
          method: "PATCH",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: (result, error, { groupId }) => [
        "Dashboard",
        "Groups",
        { type: "Groups", id: groupId },
      ],
    }),
  }),
});

export const { useGetGroupQuery, useCreateGroupMutation, useUpdateGroupMutation } = groupFormApi;

