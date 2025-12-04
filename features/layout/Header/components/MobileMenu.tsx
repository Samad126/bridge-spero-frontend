import Image from "next/image";
import Link from "next/link";
import {
  UserRole,
  publicNavItems,
  authNavItems,
  authIconItems,
  shouldShowItem,
  getNavHref,
} from "../config/navigation";
import { NavLink } from "./NavLink";

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
  if (!isOpen) return null;

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
          {authIconItems.map((item, index) => (
            <li
              key={item.label}
              className={`flex-1 ${
                index < authIconItems.length - 1
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
          ))}
        </ul>
      </nav>
    </div>
  );
}