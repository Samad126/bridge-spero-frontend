import { baseApi } from "@/lib/redux/baseApi";

export interface ZoomVerifyResponse {
  connected: boolean;
}

export const zoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getZoomAuthorize: builder.query<string, void>({
      query: () => ({
        url: `/zoom/oauth/authorize`,
        meta: { authMode: "strict" },
        responseHandler: "text",
      }),
      providesTags: ["Zoom"],
    }),

    verifyZoomConnection: builder.query<ZoomVerifyResponse, void>({
      query: () => ({
        url: `/zoom/oauth/verify`,
        meta: { authMode: "strict" },
      }),
      providesTags: ["Zoom"],
    }),

    startLesson: builder.query<string, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/start-lesson`,
        method: "GET",
        meta: { authMode: "strict" },
        responseHandler: "text",
      }),
      providesTags: ["Zoom"],
    }),
  }),
});

export const {
  useGetZoomAuthorizeQuery,
  useLazyGetZoomAuthorizeQuery,
  useVerifyZoomConnectionQuery,
  useLazyVerifyZoomConnectionQuery,
  useStartLessonQuery,
  useLazyStartLessonQuery,
} = zoomApi;
