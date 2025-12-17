"use client";

import AuthLogo from "../AuthLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  StudentRegistrationFormData,
  studentRegistrationSchema,
} from "../schemas/authSchemas";
import { useState, useEffect } from "react";
import PrivacyPolicyModal from "@/features/privacy-policy/components/PrivacyPolicyModal";
import PasswordInput from "../components/PasswordInput";

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

interface Subject {
  id: number;
  name: string;
}

const StudentRegistration = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(studentRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      phoneCode: "+994",
      interests: [] as number[],
      agreedToTerms: false,
    },
  });

  const handleSubjectChange = (subjectId: number) => {
    const newSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter((id) => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(newSelectedSubjects);
    setValue("interests", newSelectedSubjects);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const data = await response.json();
        setSubjects(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const onSubmit = async (data: StudentRegistrationFormData) => {
    setIsLoading(true);
    setApiError(null);
    setFieldErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        router.push("/login");
        return;
      }

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
            Student Registration
          </h2>
          <p className="text-tertiary text-center leading-[130%] lg:text-[20px]">
            Create your account to start learning
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
              <PasswordInput
                id="password"
                placeholder="Password"
                label="Password *"
                error={errors.password?.message || fieldErrors.password}
                className="outline-0 h-[43px]"
                {...register("password")}
              />
            </div>

            <div className="w-full">
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password *"
                error={
                  errors.confirmPassword?.message || fieldErrors.confirmPassword
                }
                className="outline-0 h-[43px]"
                {...register("confirmPassword")}
              />
            </div>

            <div className="w-full lg:col-span-2">
              <label className="leading-[100%] block w-full mb-[8px]">
                Which Categories Interests You
              </label>
              <div className="grid grid-cols-2 gap-2 p-[12px] border border-gray-light">
                {subjects.map((subject) => (
                  <label
                    key={subject.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleSubjectChange(subject.id)}
                      className="w-[18px] h-[18px] border border-gray-light"
                    />
                    <span className="text-sm">{subject.name}</span>
                  </label>
                ))}
              </div>
              {(errors.interests || fieldErrors.interests) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interests?.message || fieldErrors.interests}
                </p>
              )}
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
                className="w-full p-[12px] border border-gray-light placeholder-gray-light outline-0 h-[100px] text-secondary"
              ></textarea>
            </div>

            <div className="flex items-center gap-[12px] lg:col-span-2">
              <input
                id="agreedToTerms"
                type="checkbox"
                {...register("agreedToTerms")}
                className="w-[18px] h-[18px] border border-gray-light"
              />
              <label
                htmlFor="agreedToTerms"
                className="text-[15px] leading-[100%] lg:block"
              >
                I agree to the{" "}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyModal(true);
                  }}
                  className="text-primary cursor-pointer hover:underline"
                >
                  terms and conditions
                </span>
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
              {isLoading ? "Creating Account..." : "Create Student Account"}
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
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
};

export default StudentRegistration;
