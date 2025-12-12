"use client";

import Image from "next/image";
import { useState, forwardRef } from "react";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  error?: string;
  label?: string;
  labelRight?: React.ReactNode;
  className?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, placeholder, error, label, labelRight, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        {label && (
          <div className="w-full flex justify-between">
            <label htmlFor={id}>{label}</label>
            {labelRight}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`w-full p-[12px] pr-[48px] gap-[10px] border border-gray-light placeholder-gray-light mt-[10px] ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[12px] top-1/2 -translate-y-1/2 mt-[5px] text-gray-500 hover:text-secondary transition-colors"
            tabIndex={-1}
          >
            <Image
              src={showPassword ? "/eye-off.svg" : "/eye.svg"}
              alt={showPassword ? "Hide password" : "Show password"}
              width={22}
              height={22}
              className="w-[22px] h-[22px]"
            />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
