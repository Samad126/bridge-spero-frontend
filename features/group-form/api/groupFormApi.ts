import { baseApi } from "@/lib/redux/baseApi";
import { CreateGroupPayload, CreateGroupResponse } from "../types/groupFormTypes";

export const groupFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<CreateGroupResponse, CreateGroupPayload>({
      query: (payload) => {
        // Create FormData inside the API
        // const formData = new FormData();

        // Convert date from YYYY-MM-DD to dd.MM.yyyy format
        const dateObj = new Date(payload.startDate);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;
        payload.startDate = formattedDate;

        // // Append required fields
        // formData.append("name", payload.name);
        // formData.append("categoryId", payload.categoryId.toString());
        // formData.append("language", payload.language);
        // formData.append("startDate", formattedDate);
        // formData.append("durationInMonths", payload.durationInMonths.toString());
        // formData.append("minStudents", payload.minStudents.toString());
        // formData.append("maxStudents", payload.maxStudents.toString());
        // formData.append("price", payload.price.toString());

        // // Append optional fields
        // if (payload.description) {
        //   formData.append("description", payload.description);
        // }

        // if (payload.groupImage) {
        //   formData.append("groupImage", payload.groupImage);
        // }

        // if (payload.syllabus) {
        //   formData.append("syllabus", payload.syllabus);
        // }

        return {
          url: "/groups",
          method: "POST",
          body: payload,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["Dashboard", "Groups"],
    }),
  }),
});

export const { useCreateGroupMutation } = groupFormApi;

