import Image from "next/image";
import Link from "next/link";
import { getNavHref, NavItem, UserRole } from "../config/navigation";

interface NavLinkProps {
  item: NavItem;
  role: UserRole;
  variant?: "desktop" | "mobile";
  isActive?: boolean;
}

export function NavLink({
  item,
  role,
  variant = "desktop",
  isActive = false,
}: NavLinkProps) {
  const href = getNavHref(item, role);
  console.log(href);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className={`block p-[20px] border-b border-gray-light ${
          isActive ? "text-primary" : ""
        }`}
        aria-label={item.ariaLabel}
      >
        {item.isIcon ? (
          <Image
            src={item.icon!}
            alt={item.label}
            width={22}
            height={22}
            loading="eager"
            className="min-w-[22px] min-h-[22px]"
          />
        ) : (
          item.label
        )}
      </Link>
    );
  }

  if (item.isIcon) {
    return (
      <Link
        href={href}
        className="h-full text-center flex items-center justify-center border-r border-gray-light"
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
    );
  }

  return (
    <Link
      href={href}
      className={`h-full text-center flex items-center justify-center border-r border-gray-light ${
        item.className || ""
      }`}
    >
      {item.label}
    </Link>
  );
}
