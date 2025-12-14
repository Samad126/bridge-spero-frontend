"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateUserProfileMutation, useUpdateTeacherProfileMutation, type UpdateProfileRequest } from "../api/profileApi";
import { useGetCategoriesQuery } from "@/features/my-groups/api/myGroupsApi";
import type { Category } from "@/features/my-groups/types/myGroupsTypes";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profileType: "student" | "teacher";
  currentData: {
    name: string;
    surname: string;
    phoneNumber?: string;
    phoneCode?: string;
    bio?: string;
    interests?: string[];
  };
};

const editProfileSchema = yup.object({
  name: yup.string().required("First name is required"),
  surname: yup.string().required("Last name is required"),
  phoneNumber: yup.string(),
  phoneCode: yup.string(),
  bio: yup.string(),
  interests: yup.array().of(yup.string().required()).default([]),
});

type EditProfileFormData = {
  name: string;
  surname: string;
  phoneNumber?: string;
  phoneCode?: string;
  bio?: string;
  interests: string[];
};

export default function EditProfileModal({
  isOpen,
  onClose,
  profileType,
  currentData,
}: EditProfileModalProps) {
  const [updateUserProfile, { isLoading: isUpdatingUser }] = useUpdateUserProfileMutation();
  const [updateTeacherProfile, { isLoading: isUpdatingTeacher }] = useUpdateTeacherProfileMutation();
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema) as never,
    defaultValues: {
      name: currentData.name || "",
      surname: currentData.surname || "",
      phoneNumber: currentData.phoneNumber || "",
      phoneCode: currentData.phoneCode || "+994",
      bio: currentData.bio || "",
      interests: currentData.interests || [],
    },
  });

  const selectedInterests = watch("interests") || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      reset({
        name: currentData.name || "",
        surname: currentData.surname || "",
        phoneNumber: currentData.phoneNumber || "",
        phoneCode: currentData.phoneCode || "+994",
        bio: currentData.bio || "",
        interests: currentData.interests || [],
      });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentData, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const updateData: UpdateProfileRequest = {
        name: data.name,
        surname: data.surname,
        phoneCode: data.phoneCode,
        phoneNumber: data.phoneNumber,
        bio: data.bio,
        interests: data.interests,
      };

      if (profileType === "student") {
        await updateUserProfile(updateData).unwrap();
      } else {
        await updateTeacherProfile(updateData).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleInterestToggle = (categoryName: string) => {
    const current = selectedInterests;
    const newInterests = current.includes(categoryName)
      ? current.filter((name) => name !== categoryName)
      : [...current, categoryName];
    setValue("interests", newInterests);
  };

  if (!isOpen) return null;

  const isLoading = isUpdatingUser || isUpdatingTeacher;

  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 w-full max-w-[1148px] p-[24px] md:p-[48px] flex flex-col gap-[32px] m-auto z-90 h-max max-h-[90vh] overflow-y-auto bg-white text-secondary"
      >
        <h2 className="text-primary text-[32px] md:text-[48px] text-center font-normal">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="flex flex-col gap-[12px]">
              <label className="text-secondary text-[18px]">First Name</label>
              <input
                type="text"
                {...register("name")}
                className="border border-gray-light px-[16px] py-[12px] text-[18px] focus:outline-none focus:border-secondary"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-[12px]">
              <label className="text-secondary text-[18px]">Last Name</label>
              <input
                type="text"
                {...register("surname")}
                className="border border-gray-light px-[16px] py-[12px] text-[18px] focus:outline-none focus:border-secondary"
              />
              {errors.surname && (
                <p className="text-red-500 text-sm">{errors.surname.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <label className="text-secondary text-[18px]">Phone Number</label>
            <div className="flex gap-[8px]">
              <div className="relative">
                <select
                  {...register("phoneCode")}
                  className="border border-gray-light px-[12px] py-[12px] text-[18px] appearance-none pr-[32px] focus:outline-none focus:border-secondary h-full"
                >
                  <option value="+994">+994</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+90">+90</option>
                  <option value="+91">+91</option>
                  <option value="+9188">+9188</option>
                </select>
                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="911861994"
                className="border border-gray-light px-[16px] py-[12px] text-[18px] flex-1 focus:outline-none focus:border-secondary"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[12px]">
            <label className="text-secondary text-[18px]">
              Interests (Choose Categories)
            </label>
            <div className="grid grid-cols-2 gap-[12px] p-[12px] border border-gray-light">
              {isLoadingCategories ? (
                <div className="col-span-2 text-center py-[12px] text-gray-400">
                  Loading categories...
                </div>
              ) : !categories || categories.length === 0 ? (
                <div className="col-span-2 text-center py-[12px] text-gray-400">
                  No categories available
                </div>
              ) : (
                categories.map((category: Category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-[8px] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(category.name)}
                      onChange={() => handleInterestToggle(category.name)}
                      className="w-[18px] h-[18px] border border-gray-light"
                    />
                    <span className="text-[16px]">{category.name}</span>
                  </label>
                ))
              )}
            </div>
            {errors.interests && (
              <p className="text-red-500 text-sm">{errors.interests.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[12px]">
            <label className="text-secondary text-[18px]">Bio</label>
            <textarea
              {...register("bio")}
              rows={5}
              className="border border-gray-light px-[16px] py-[12px] text-[18px] resize-none focus:outline-none focus:border-secondary"
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-[16px] justify-center items-center mt-[24px]">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-secondary text-white py-[12px] px-[64px] text-[18px] cursor-pointer disabled:opacity-50 order-2 md:order-1 w-full md:w-auto"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="border border-secondary text-secondary py-[12px] px-[64px] text-[18px] cursor-pointer disabled:opacity-50 order-1 md:order-2 w-full md:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={onClose}
        className="w-full h-full fixed inset-0 bg-[#00000099] z-80"
      ></div>
    </div>
  );
}
