"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRole } from "../config/navigation";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/features/auth/slices/authSlice";
import { useRouter } from "next/navigation";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userRole: UserRole;
}

export function ProfilePopup({
  isOpen,
  onClose,
  userName,
  userRole,
}: ProfilePopupProps) {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserProfileOptionalQuery(undefined, {});

  const router = useRouter();

  if (!isOpen) return null;

  // Use RTK Query data if available, otherwise fall back to props
  // const displayName = userData
  //   ? `${userData.name} ${userData.surname}`
  //   : userName;

  const handleLogout = async () => {
    try {
      // Dispatch logout action to clear RTK Query cache
      dispatch(logout());

      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const profileHref =
    userRole === "USER" ? "/student-profile" : "/teacher-profile";
  const settingsHref =
    userRole === "USER" ? "/student/settings" : "/teacher/settings";

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute right-0 top-full w-[247px] p-[24px] z-50 border border-gray-light bg-white shadow-lg">
        {/* User Avatar and Name */}
        <div className="flex flex-col items-center mb-[24px] px-[20px]">
          <div className="w-[62px] h-[62px] rounded-full bg-gray-300 flex items-center justify-center mb-[12px] overflow-hidden">
            {userData?.imageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_PAGE_URL}${userData.imageUrl}`}
                alt="User avatar"
                width={62}
                height={62}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/user.svg"
                alt="User avatar"
                width={32}
                height={32}
                className="min-w-[32px] min-h-[32px]"
              />
            )}
          </div>
          <p className="w-full min-w-0 font-medium text-[20px] text-center">
            {userData ? (
              <>
                <span className="w-full block truncate">{userData.name}</span>{" "}
                <span className="w-full block truncate">{userData.surname}</span>
              </>
            ) : (
              userName
            )}
          </p>
        </div>

        {/* Menu Items */}
        <nav>
          <ul className="flex flex-col">
            <li>
              <Link
                href={profileHref}
                className="block px-[20px] py-[12px] border border-gray-light text-secondary"
                onClick={onClose}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={settingsHref}
                className="block px-[20px] py-[12px] border border-gray-light text-secondary"
                onClick={onClose}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-[20px] py-[12px] border border-gray-light text-[#CB0000]"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
