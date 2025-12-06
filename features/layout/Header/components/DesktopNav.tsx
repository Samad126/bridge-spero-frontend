"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserRole,
  publicNavItems,
  authNavItems,
  authIconItems,
  shouldShowItem,
} from "../config/navigation";
import { NavLink } from "./NavLink";
import { ProfilePopup } from "./ProfilePopup";

interface DesktopNavProps {
  isAuthenticated: boolean;
  userRole: UserRole;
  onSearchClick: () => void;
  userName?: string;
}

export function DesktopNav({
  isAuthenticated,
  userRole,
  onSearchClick,
  userName = "User",
}: DesktopNavProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  if (!isAuthenticated) {
    return (
      <nav className="h-full">
        <ul className="hidden xxl:flex h-full items-center">
          {publicNavItems.map((item) => (
            <li key={item.label} className="w-full h-full min-w-[165px]">
              <NavLink item={item} role={userRole} />
            </li>
          ))}
          <li className="w-full h-full min-w-[102px]">
            <Link
              href="/login"
              className="h-full text-center flex items-center justify-center border-r border-gray-light"
            >
              Login
            </Link>
          </li>
          <li className="w-full h-full min-w-[102px]">
            <Link
              href="/signup"
              className="h-full text-center flex items-center justify-center border-r border-gray-light bg-secondary text-custom-white"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  console.log(userRole);

  return (
    <nav className="h-full">
      <ul className="hidden xxl:flex h-full items-center">
        {authNavItems
          .filter((item) => shouldShowItem(item, userRole))
          .map((item) => (
            <li key={item.label} className="w-full h-full min-w-[165px]">
              <NavLink item={item} role={userRole} />
            </li>
          ))}

        <li className="w-full h-full min-w-[62px] xxl:min-w-[82px]">
          <button
            className="h-full text-center flex items-center justify-center border-r border-gray-light w-full"
            onClick={onSearchClick}
            aria-label="Search"
          >
            <Image
              src="/search.svg"
              alt="search"
              width={22}
              height={22}
              loading="eager"
              className="min-w-[22px] min-h-[22px]"
            />
          </button>
        </li>

        {authIconItems.map((item) => {
          if (item.label === "Profile") {
            return (
              <li
                key={item.label}
                className="w-full h-full min-w-[62px] xxl:min-w-[82px] relative"
                ref={profileRef}
              >
                <button
                  className="h-full text-center flex items-center justify-center border-r border-gray-light w-full"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label={item.ariaLabel}
                >
                  <Image
                    src={item.icon!}
                    alt={item.label}
                    width={22}
                    height={22}
                    loading="eager"
                    className="min-w-[22px] min-h-[22px]"
                  />
                </button>
                <ProfilePopup
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  userName={userName}
                  userRole={userRole}
                />
              </li>
            );
          }

          return (
            <li key={item.label} className="w-full h-full min-w-[62px] xxl:min-w-[82px]">
              <NavLink item={item} role={userRole} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}