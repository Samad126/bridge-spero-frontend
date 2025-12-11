"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthLogo from "../AuthLogo";
import { loginSchema, LoginFormData } from "../schemas/authSchemas";
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

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
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
        setApiError(result.errorMessage || "Login failed");
        return;
      }

      // Parse JWT to get user role and redirect to appropriate dashboard
      const response2 = await fetch("/api/me", {
        credentials: "include",
      });

      if (response2.ok) {
        const userData = await response2.json();
        const dashboardPath = userData.role === "USER" ? "/student" : "/teacher";

        // Check if there was a redirect path stored
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          router.push(redirectPath);
          return;
        }

        // Redirect to role-based dashboard
        router.push(dashboardPath);
      } else {
        // Fallback to home page if unable to get user data
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <section className="w-[350px] mx-auto flex flex-col items-center justify-center border border-gray-light p-[32px] gap-[24px] xxl:w-[408px]">
        <AuthLogo />
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-[28px] text-center leading-[100%] xxl:text-[48px]">
            Welcome Back
          </h2>
          <p className="text-tertiary text-center leading:[130%] xxl:text-[20px]">
            Sign in your account to continue
          </p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
            {apiError && (
              <div className="p-[12px] text-red-700 text-sm">
                {apiError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="leading-[100%]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light mt-[10px]"
              />
              {(errors.email || fieldErrors.email) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message || fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="w-full flex justify-between">
                <label htmlFor="password">Password</label>
                <Link href={"/"} className="text-primary">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light mt-[10px]"
              />
              {(errors.password || fieldErrors.password) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message || fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-[18px] text-custom-white bg-secondary p-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <span className="text-primary">
                <Link href={"/signup"}>Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;