"use client";

import Image from "next/image";
import Schedule from "./Schedule";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupSchema } from "../schemas/groupFormSchema";
import { Language } from "../types/groupFormTypes";
import { useCreateGroupMutation, useUpdateGroupMutation, useGetGroupQuery } from "../api/groupFormApi";
import { useState, useEffect } from "react";

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
  const { data: existingGroup, isLoading: isLoadingGroup } = useGetGroupQuery(groupId!, {
    skip: !groupId,
  });

  const [apiError, setApiError] = useState<string>("");
  const [groupImageFile, setGroupImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);

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
    },
  });

  // Load existing group data when editing
  useEffect(() => {
    if (existingGroup && isEditMode) {
      // Convert dd.MM.yyyy to YYYY-MM-DD
      const [day, month, year] = existingGroup.startDate.split('.');
      const formattedDate = `${year}-${month}-${day}`;

      reset({
        name: existingGroup.name,
        categoryId: existingGroup.categoryId,
        language: existingGroup.language,
        startDate: formattedDate,
        durationInMonths: existingGroup.durationInMonths,
        maxStudents: existingGroup.maxStudents,
        price: existingGroup.price,
        description: existingGroup.description || "",
      });

      // Set existing image if available
      if (existingGroup.imageUrl) {
        setImagePreview(existingGroup.imageUrl);
      }
    }
  }, [existingGroup, isEditMode, reset]);

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
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} group:`, error);
      const errorMessage =
        (error as { data?: { errorMessage?: string } })?.data?.errorMessage ||
        `Failed to ${isEditMode ? 'update' : 'create'} group. Please try again.`;
      setApiError(errorMessage);
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
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-4 xxl:gap-x-[12px] xxl:gap-y-[24px]">
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
            <input
              id="categoryId"
              type="number"
              {...register("categoryId", { valueAsNumber: true })}
              className={`h-[43px] px-[12px] outline-0 w-full border ${
                errors.categoryId ? "border-red-500" : "border-gray-light"
              }`}
              readOnly
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-[8px]" htmlFor="startDate">
              Lesson Start Date *
            </label>
            <div className={`flex items-center border gap-[12px] ${
              errors.startDate ? "border-red-500" : "border-gray-light"
            }`}>
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
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.durationInMonths.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.maxStudents.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-[8px]" htmlFor="price">
              Price (monthly) *
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
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>
        </div>

        {id ? null : (
          <div className="flex flex-col items-start gap-[18px] lg:gap-[12px] my-[18px] lg:flex-row lg:my-[24px]">
            <Schedule />
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
          </div>
        )}

        <div className="mb-[18px] flex flex-col gap-[18px] lg:mb-[42px] lg:flex-row lg:gap-[12px]">
          <div>
            <label className="block mb-[8px]" htmlFor="groupImage">
              Group Image
            </label>
            <label
              htmlFor="groupImage"
              className="w-full h-[233px] bg-gray-light border border-gray-light flex flex-col items-center justify-center cursor-pointer lg:w-[249px] lg:h-[166px] overflow-hidden relative"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Group preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs">
                    Change Image
                  </div>
                </>
              ) : groupImageFile ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={'/camera.svg'}
                    width={22}
                    height={22}
                    alt=""
                  />
                  <p className="text-secondary mt-2 text-sm px-2 text-center">
                    {groupImageFile.name}
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-3xl text-gray-600">
                    <Image
                      src={'/camera.svg'}
                      width={22}
                      height={22}
                      alt=""
                    />
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
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
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
              ? (isEditMode ? "Updating..." : "Creating...")
              : (isEditMode ? "Update" : "Create")}
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
