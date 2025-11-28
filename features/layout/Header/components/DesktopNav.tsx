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

interface DesktopNavProps {
  isAuthenticated: boolean;
  userRole: UserRole;
  onSearchClick: () => void;
}

export function DesktopNav({
  isAuthenticated,
  userRole,
  onSearchClick,
}: DesktopNavProps) {
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
              href="/"
              className="h-full text-center flex items-center justify-center border-r border-gray-light"
            >
              Login
            </Link>
          </li>
          <li className="w-full h-full min-w-[102px]">
            <Link
              href="/"
              className="h-full text-center flex items-center justify-center border-r border-gray-light bg-secondary text-custom-white"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

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

        {authIconItems.map((item) => (
          <li key={item.label} className="w-full h-full min-w-[62px] xxl:min-w-[82px]">
            <NavLink item={item} role={userRole} />
          </li>
        ))}
      </ul>
    </nav>
  );
}