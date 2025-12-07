"use client";

import AuthLogo from "../AuthLogo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  teacherRegistrationSchema,
  TeacherRegistrationFormData,
} from "../schemas/authSchemas";
import { useState } from "react";

interface BackendError {
  field: string;
  message: string;
}

interface BackendErrorResponse {
  requestId?: string;
  errorCode?: string;
  errorMessage?: string;
  errors?: BackendError[];
  timestamp?: string;
}

const DEMO_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
];

const TeacherRegistration = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [demoVideoFile, setDemoVideoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(teacherRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      phoneCode: "+994",
      subjects: [] as string[],
      agreedToTerms: false,
    },
  });

  const handleSubjectChange = (subject: string) => {
    const newSelectedSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(newSelectedSubjects);
    setValue("subjects", newSelectedSubjects);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDemoVideoFile(file);
    }
  };

  const onSubmit = async (data: TeacherRegistrationFormData) => {
    setIsLoading(true);
    setApiError(null);
    setFieldErrors({});

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("email", data.email);
      formData.append("phoneCode", data.phoneCode);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      data.subjects.forEach((subject) => {
        formData.append("subjects", subject);
      });
      formData.append("experience", data.experience);
      if (data.bio) {
        formData.append("bio", data.bio);
      }
      formData.append("agreedToTerms", String(data.agreedToTerms));

      if (demoVideoFile) {
        formData.append("demoVideo", demoVideoFile);
      }

      const response = await fetch("/api/auth/signup/teacher", {
        method: "POST",
        body: formData,
      });

      const result: BackendErrorResponse = await response.json();

      if (!response.ok) {
        // Handle field-specific errors
        if (result.errors && result.errors.length > 0) {
          const newFieldErrors: Record<string, string> = {};
          result.errors.forEach((error) => {
            newFieldErrors[error.field] = error.message;
          });
          setFieldErrors(newFieldErrors);
        }

        // Set general error message
        setApiError(result.errorMessage || "Registration failed");
        return;
      }

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center my-10">
      <section className="w-[343px] h-full mx-auto flex flex-col items-center justify-center border border-gray-light p-[32px] gap-[24px] lg:w-[692px] ">
        <AuthLogo />
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-[28px] text-center leading-[100%] lg:text-[48px]">
            Teacher Registration
          </h2>
          <p className="text-tertiary text-center leading-[130%] lg:text-[20px]">
            Share your knowledge and inspire students
          </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-[18px] lg:grid-cols-2 lg:gap-x-[12px] lg:gap-y-[24px]"
          >
            {apiError && (
              <div className="lg:col-span-2 p-[12px] bg-red-100 border border-red-400 text-red-700 text-sm">
                {apiError}
              </div>
            )}
            <div className="w-full">
              <label
                htmlFor="name"
                className="leading-[100%] block w-full mb-[8px]"
              >
                First Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="First Name"
                {...register("name")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {(errors.name || fieldErrors.name) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message || fieldErrors.name}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="surname"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Last Name *
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Last Name"
                {...register("surname")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {(errors.surname || fieldErrors.surname) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.surname?.message || fieldErrors.surname}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {(errors.email || fieldErrors.email) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message || fieldErrors.email}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Phone Number *
              </label>
              <div className="flex w-full">
                <select
                  {...register("phoneCode")}
                  className="p-[12px] h-[43px] leading-[130%] border border-gray-light placeholder-gray-light outline-0"
                >
                  <option value="+994">+994</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+90">+90</option>
                </select>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  className="p-[12px] w-full h-[43px] leading-[130%] border border-gray-light placeholder-gray-light  outline-0"
                />
              </div>
              {(errors.phoneNumber || fieldErrors.phoneNumber) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber?.message || fieldErrors.phoneNumber}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Password *
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {(errors.password || fieldErrors.password) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message || fieldErrors.password}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {(errors.confirmPassword || fieldErrors.confirmPassword) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message || fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="w-full lg:col-span-2">
              <label className="leading-[100%] block w-full mb-[8px]">
                Choose Subjects *
              </label>
              <div className="grid grid-cols-2 gap-2 p-[12px] border border-gray-light">
                {DEMO_SUBJECTS.map((subject) => (
                  <label key={subject} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="w-[18px] h-[18px] border border-gray-light"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-red-500 text-sm mt-1">{errors.subjects.message}</p>
              )}
            </div>

            <div className="w-full lg:col-span-2">
              <label
                htmlFor="experience"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Years of Experience *
              </label>
              <input
                id="experience"
                type="text"
                placeholder="e.g., 5 years"
                {...register("experience")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
              )}
            </div>

            <div className="w-full lg:col-span-2">
              <label
                htmlFor="demoVideo"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Demo Lesson Video *
              </label>
              <label
                htmlFor="demoVideo"
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
                  {demoVideoFile ? demoVideoFile.name : "Upload File"}
                </span>
                <input
                  id="demoVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="w-full lg:col-span-2">
              <label
                htmlFor="bio"
                className="leading-[100%] block w-full mb-[8px]"
              >
                Bio
              </label>
              <textarea
                id="bio"
                placeholder="Bio"
                {...register("bio")}
                className="w-full p-[12px] border border-gray-light placeholder-gray-light outline-0 h-[100px] text-gray-light"
              ></textarea>
            </div>

            <div className="flex items-center gap-[12px] lg:col-span-2">
              <input
                id="agreedToTerms"
                type="checkbox"
                {...register("agreedToTerms")}
                className="w-[18px] h-[18px] border border-gray-light"
              />
              <label htmlFor="agreedToTerms" className="text-[15px] leading-[100%] lg:block">
                I agree to the{" "}
                <span className="text-primary">terms and conditions</span>
              </label>
            </div>
            {errors.agreedToTerms && (
              <p className="text-red-500 text-sm lg:col-span-2 -mt-3">
                {errors.agreedToTerms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-[18px] text-custom-white bg-secondary p-[12px] lg:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Teacher Account"}
            </button>
            <p className="w-full text-center lg:col-span-2">
              Already have an account?{" "}
              <span className="text-primary">
                <Link href={"/login"}>Sign In</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default TeacherRegistration;
