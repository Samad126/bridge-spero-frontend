import { baseApi } from "@/lib/redux/baseApi";

export const jitsiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startJitsiLesson: builder.query<string, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/start-jitsi-lesson`,
        method: "GET",
        meta: { authMode: "strict" },
        responseHandler: "text",
      }),
      providesTags: ["Jitsi"],
    }),

    joinJitsiLesson: builder.query<string, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/join-jitsi-lesson`,
        method: "GET",
        meta: { authMode: "strict" },
        responseHandler: "text",
      }),
      providesTags: ["Jitsi"],
    }),
  }),
});

export const {
  useStartJitsiLessonQuery,
  useLazyStartJitsiLessonQuery,
  useJoinJitsiLessonQuery,
  useLazyJoinJitsiLessonQuery,
} = jitsiApi;
