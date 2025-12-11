import { baseApi } from "@/lib/redux/baseApi";

export interface TeacherPublicProfile {
  id: number;
  name: string | null;
  surname: string | null;
  rating: number | null;
  phone: string | null;
  email: string | null;
  interests: string[];
  students: number | null;
  bio: string | null;
  imageUrl: string | null;
  backgroundImageUrl: string | null;
  demoVideoUrl: string | null;
}

export interface UserPublicProfile {
  id: number;
  name: string | null;
  surname: string | null;
  phone: string | null;
  email: string | null;
  interests: string[];
  bio: string | null;
  imageUrl: string | null;
  backgroundImageUrl: string | null;
}

export interface TeacherGroup {
  id: number;
  teacherId: number;
  imageUrl: string;
  category: string;
  language: string;
  name: string;
  teacherName: string;
  teacherSurname: string;
  price: number;
  status: "ACTIVE" | "INACTIVE" | string; // adjust if needed
}

export interface UserGroup {
  id: number;
  teacherId: number;
  imageUrl: string;
  category: string;
  language: string;
  name: string;
  teacherName: string;
  teacherSurname: string;
  price: number;
  status: "ACTIVE" | "INACTIVE" | string; // adjust if needed
}

export type ProfileGroup = TeacherGroup | UserGroup;

export interface UpdateProfileRequest {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  bio?: string;
  categories?: number[];
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get teacher public profile
    getTeacherPublicProfile: builder.query<TeacherPublicProfile, number>({
      query: (teacherId) => ({
        url: `/teachers/${teacherId}/profile`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, teacherId) => [
        { type: "User", id: `teacher-${teacherId}` },
      ],
    }),

    // Get user public profile
    getUserPublicProfile: builder.query<UserPublicProfile, number>({
      query: (userId) => ({
        url: `/users/${userId}/profile`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, userId) => [
        { type: "User", id: `user-${userId}` },
      ],
    }),

    // Upload demo video (teacher only)
    uploadDemoVideo: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/teachers/demo-video",
          method: "PUT",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Upload profile picture
    uploadProfilePicture: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/users/profile-picture",
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Update profile picture
    updateProfilePicture: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/users/profile-picture",
          method: "PATCH",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Delete profile picture
    deleteProfilePicture: builder.mutation<void, void>({
      query: () => ({
        url: "/users/profile-picture",
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["User"],
    }),

    // Upload background image
    uploadBackgroundImage: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/users/background-image",
          method: "POST",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Update background image
    updateBackgroundImage: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/users/background-image",
          method: "PATCH",
          body: formData,
          meta: { authMode: "strict" },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Delete background image
    deleteBackgroundImage: builder.mutation<void, void>({
      query: () => ({
        url: "/users/background-image",
        method: "DELETE",
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["User"],
    }),

    // Get teacher groups (public)
    getTeacherGroups: builder.query<ProfileGroup[], number>({
      query: (teacherId) => ({
        url: `/teachers/${teacherId}/groups`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, teacherId) => [
        { type: "Groups", id: `teacher-${teacherId}` },
      ],
    }),

    // Get user groups (public)
    getUserGroups: builder.query<ProfileGroup[], number>({
      query: (userId) => ({
        url: `/users/${userId}/groups`,
        meta: { authMode: "optional" },
      }),
      providesTags: (result, error, userId) => [
        { type: "Groups", id: `user-${userId}` },
      ],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<
      UserPublicProfile,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["User"],
    }),

    // Update teacher profile
    updateTeacherProfile: builder.mutation<
      TeacherPublicProfile,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/teachers/profile",
        method: "PATCH",
        body: data,
        meta: { authMode: "strict" },
      }),
      invalidatesTags: ["User"],
    }),

    // Rate a teacher
    rateTeacher: builder.mutation<void, { teacherId: number; rating: number }>({
      query: ({ teacherId, rating }) => ({
        url: `/teachers/${teacherId}/rate`,
        method: "POST",
        body: { rating },
        meta: { authMode: "strict" },
      }),
      invalidatesTags: (_result, _error, { teacherId }) => [
        { type: "User", id: `teacher-${teacherId}` },
      ],
    }),
  }),
});

export const {
  useGetTeacherPublicProfileQuery,
  useGetUserPublicProfileQuery,
  useUploadDemoVideoMutation,
  useUploadProfilePictureMutation,
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useUploadBackgroundImageMutation,
  useUpdateBackgroundImageMutation,
  useDeleteBackgroundImageMutation,
  useGetTeacherGroupsQuery,
  useGetUserGroupsQuery,
  useUpdateUserProfileMutation,
  useUpdateTeacherProfileMutation,
  useRateTeacherMutation,
} = profileApi;
