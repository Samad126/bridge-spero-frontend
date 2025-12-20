"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupSchema } from "../schemas/groupFormSchema";
import { Language } from "../types/groupFormTypes";
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupQuery,
} from "../api/groupFormApi";
import { useGetCategoriesQuery } from "@/features/my-groups/api/myGroupsApi";
import { useState, useEffect } from "react";
import { getErrorMessage } from "@/lib/types/apiErrorTypes";

interface FormData {
  name: string;
  categoryId: number;
  language: Language;
  startDate: string;
  durationInMonths: number;
  maxStudents: number;
  price: number;
  description?: string;
}

function Form() {
  const { id } = useParams();
  const router = useRouter();
  const isEditMode = !!id;
  const groupId = id ? parseInt(id as string) : undefined;

  const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();
  const { data: existingGroup, isLoading: isLoadingGroup } = useGetGroupQuery(
    groupId!,
    {
      skip: !groupId,
    }
  );
  const { data: categories = [] } = useGetCategoriesQuery();

  const [apiError, setApiError] = useState<string>("");
  const [groupImageFile, setGroupImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);

  // Derive the image preview from existing group or uploaded file
  const displayImagePreview = imagePreview || (isEditMode && existingGroup?.imageUrl) || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      categoryId: 1,
      language: Language.AZERBAIJANI,
      durationInMonths: 1,
      maxStudents: 15,
      price: 0,
    },
  });

  // Load existing group data when editing
  useEffect(() => {
    if (existingGroup && isEditMode && categories.length > 0) {
      // Convert dd.MM.yyyy to YYYY-MM-DD
      const [day, month, year] = existingGroup.startDate.split(".");
      const formattedDate = `${year}-${month}-${day}`;

      // Convert language string to enum
      const languageMap: Record<string, Language> = {
        "Azerbaijani": Language.AZERBAIJANI,
        "English": Language.ENGLISH,
        "Russian": Language.RUSSIAN,
        "Turkish": Language.TURKISH,
      };

      // Convert weeks to months (approximate)
      const durationInMonths = Math.ceil(existingGroup.durationInWeeks / 4);

      // Find the categoryId from category name
      const matchedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === existingGroup.category.toLowerCase()
      );
      const categoryId = matchedCategory ? matchedCategory.id : categories[0]?.id || 1;

      setImagePreview(process.env.NEXT_PUBLIC_PAGE_URL! + existingGroup.imageUrl);

      reset({
        name: existingGroup.name,
        categoryId: categoryId,
        language: languageMap[existingGroup.language] || Language.AZERBAIJANI,
        startDate: formattedDate,
        durationInMonths: durationInMonths,
        maxStudents: existingGroup.maxStudents,
        price: existingGroup.price,
        description: existingGroup.description || "",
      });
    }
  }, [existingGroup, isEditMode, categories, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setApiError("");

      const payload = {
        name: data.name,
        categoryId: data.categoryId,
        language: data.language,
        startDate: data.startDate,
        durationInMonths: data.durationInMonths,
        maxStudents: data.maxStudents,
        price: data.price,
        description: data.description,
        groupImage: groupImageFile || undefined,
        syllabus: syllabusFile || undefined,
      };

      if (isEditMode && groupId) {
        await updateGroup({ groupId, payload }).unwrap();
        router.push(`/groups/${groupId}`);
      } else {
        await createGroup(payload).unwrap();
        router.push(`/my-groups`);
      }
    } catch (error) {
      // Use the centralized error message extraction logic
      const errorMessage = getErrorMessage(error);
      setApiError(errorMessage);

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLoading = isCreating || isUpdating || isLoadingGroup;

  const handleCancel = () => {
    router.push("/my-groups");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm mt-1">{apiError}</p>
              </div>
              <button
                type="button"
                onClick={() => setApiError("")}
                className="ml-4 text-red-700 hover:text-red-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-[18px] mb-[18px] lg:grid-cols-4 xxl:gap-x-[12px] xxl:gap-y-[24px] xxl:mb-[24px]">
          <div>
            <label className="block mb-[8px]" htmlFor="name">
              Group Name *
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.name ? "border-red-500" : "border-gray-light"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="categoryId">
              Category *
            </label>
            <select
              id="categoryId"
              {...register("categoryId", { valueAsNumber: true })}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.categoryId ? "border-red-500" : "border-gray-light"
              }`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="language">
              Teaching Language *
            </label>
            <select
              id="language"
              {...register("language")}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.language ? "border-red-500" : "border-gray-light"
              }`}
            >
              <option value={Language.AZERBAIJANI}>Azerbaijani</option>
              <option value={Language.ENGLISH}>English</option>
              <option value={Language.RUSSIAN}>Russian</option>
              <option value={Language.TURKISH}>Turkish</option>
            </select>
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                {errors.language.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-[8px]" htmlFor="startDate">
              Lesson Start Date *
            </label>
            <div
              className={`flex items-center border gap-[12px] ${
                errors.startDate ? "border-red-500" : "border-gray-light"
              }`}
            >
              <label
                className="pl-[12px] flex items-center justify-center h-[43px] select-none"
                htmlFor="startDate"
              >
                <Image
                  src={"/calendar.svg"}
                  alt="calendar"
                  width={22}
                  height={22}
                  className="min-w-[22px] h-[22px]"
                />
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate")}
                className="h-[43px] pr-[12px] outline-0 w-full"
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="durationInMonths">
              Duration (months) *
            </label>
            <select
              id="durationInMonths"
              {...register("durationInMonths", { valueAsNumber: true })}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.durationInMonths ? "border-red-500" : "border-gray-light"
              }`}
            >
              {[...Array(24)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.durationInMonths && (
              <p className="text-red-500 text-sm mt-1">
                {errors.durationInMonths.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="maxStudents">
              Max Students *
            </label>
            <select
              id="maxStudents"
              {...register("maxStudents", { valueAsNumber: true })}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.maxStudents ? "border-red-500" : "border-gray-light"
              }`}
            >
              {[...Array(50)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.maxStudents && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxStudents.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="price">
              Price ₼ (monthly) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.price ? "border-red-500" : "border-gray-light"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {id ? null : (
            <div className="flex-1 w-full">
              <label htmlFor="syllabus" className="block mb-[8px]">
                Syllabus
              </label>
              <label
                htmlFor="syllabus"
                className="flex items-center h-[43px] border border-gray-light cursor-pointer"
              >
                <div className="h-[43px] w-[43px] flex items-center justify-center border-r border-gray-light">
                  <Image
                    src="/upload.svg"
                    alt="upload"
                    width={20}
                    height={20}
                    className="min-w-[20px] h-[20px]"
                  />
                </div>
                <span className="flex-1 px-[12px] text-gray-400">
                  {syllabusFile ? syllabusFile.name : "Upload File (PDF)"}
                </span>
              </label>
              <input
                id="syllabus"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSyllabusFile(file || null);
                }}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="mb-[18px] flex flex-col gap-[18px] lg:mb-[42px] lg:flex-row lg:gap-[12px]">
          <div>
            <label className="block mb-[8px]" htmlFor="groupImage">
              Group Image
            </label>
            <label
              htmlFor="groupImage"
              className="w-full h-[233px] bg-gray-light border border-gray-light flex flex-col items-center justify-center cursor-pointer lg:w-[249px] lg:h-[166px] overflow-hidden relative"
            >
              {displayImagePreview ? (
                <>
                  <img
                    src={displayImagePreview}
                    alt="Group preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs">
                    Change Image
                  </div>
                </>
              ) : groupImageFile ? (
                <div className="flex flex-col items-center">
                  <Image src={"/camera.svg"} width={22} height={22} alt="" />
                  <p className="text-secondary mt-2 text-sm px-2 text-center">
                    {groupImageFile.name}
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-3xl text-gray-600">
                    <Image src={"/camera.svg"} width={22} height={22} alt="" />
                  </span>
                  <p className="text-secondary mt-2">Upload Image</p>
                </>
              )}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setGroupImageFile(file);
                  // Create preview URL
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setGroupImageFile(null);
                  setImagePreview(null);
                }
              }}
              className="hidden"
              id="groupImage"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-[8px]" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`w-full h-[166px] border p-[12px] outline-0 resize-none ${
                errors.description ? "border-red-500" : "border-gray-light"
              }`}
              placeholder="Description"
              id="description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-[12px] mt-[18px] mb-[42px]">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[43px] bg-secondary text-white lg:w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update"
              : "Create"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full h-[43px] bg-white border border-gray-light lg:w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
