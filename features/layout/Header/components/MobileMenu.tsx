"use client";

import Image from "next/image";
import Link from "next/link";
import {
  UserRole,
  publicNavItems,
  authNavItems,
  mobileIconItems,
  shouldShowItem,
  getNavHref,
} from "../config/navigation";
import { NavLink } from "./NavLink";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/features/auth/slices/authSlice";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  userRole: UserRole;
}

export function MobileMenu({
  isOpen,
  isAuthenticated,
  userRole,
}: MobileMenuProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      // Dispatch logout action to clear RTK Query cache
      dispatch(logout());

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="absolute right-0 top-full w-full sm:max-w-[390px] xxl:hidden border-x bg-white border-b border-t border-gray-light">
        <nav>
          <ul className="flex flex-col" id="topMenu">
            {publicNavItems.map((item) => (
              <li key={item.label}>
                <NavLink item={item} role={userRole} variant="mobile" />
              </li>
            ))}
          </ul>
          <ul className="flex justify-between" id="bottomMenu">
            <li className="flex-1">
              <Link href="/login" className="block py-[20px] text-center">
                Login
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/signup"
                className="block py-[20px] bg-secondary text-custom-white text-center"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full w-full sm:max-w-[390px] xxl:hidden border-x bg-white border-b border-t border-gray-light">
      <nav>
        <ul className="flex flex-col" id="topMenu">
          {authNavItems
            .filter((item) => shouldShowItem(item, userRole))
            .map((item, index) => (
              <li key={item.label}>
                <Link
                  href={getNavHref(item, userRole)}
                  className={`block p-[20px] border-b border-gray-light ${
                    index === 0 ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
        <ul
          className="flex justify-between border-t border-gray-light"
          id="bottomMenu"
        >
          {mobileIconItems.map((item, index) => {
            // Handle logout icon separately
            if (item.label === "Logout") {
              return (
                <li
                  key={item.label}
                  className={`flex-1 ${
                    index < mobileIconItems.length - 1
                      ? "border-r border-gray-light"
                      : ""
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center py-[20px] w-full"
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
                </li>
              );
            }

            return (
              <li
                key={item.label}
                className={`flex-1 ${
                  index < mobileIconItems.length - 1
                    ? "border-r border-gray-light"
                    : ""
                }`}
              >
                <Link
                  href={getNavHref(item, userRole)}
                  className="flex justify-center items-center py-[20px]"
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
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}