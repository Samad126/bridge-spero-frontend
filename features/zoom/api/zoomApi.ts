import { baseApi } from "@/lib/redux/baseApi";

export interface ZoomAuthorizeResponse {
  authorizeUrl: string;
}

export interface ZoomVerifyResponse {
  connected: boolean;
}

export interface StartLessonResponse {
  zoomUrl: string;
}

export const zoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getZoomAuthorize: builder.query<ZoomAuthorizeResponse, void>({
      query: () => ({
        url: `/zoom/oauth/authorize`,
        meta: { authMode: "strict" },
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

    startLesson: builder.mutation<StartLessonResponse, number>({
      query: (groupId) => ({
        url: `/groups/${groupId}/start-lesson`,
        method: "POST",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["Groups", "Zoom"],
    }),
  }),
});

export const {
  useGetZoomAuthorizeQuery,
  useVerifyZoomConnectionQuery,
  useStartLessonMutation,
} = zoomApi;
