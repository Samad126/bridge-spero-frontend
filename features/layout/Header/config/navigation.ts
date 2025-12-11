export type UserRole = "USER" | "TEACHER" | null;

export interface NavItem {
  label: string;
  href: string | ((role: UserRole) => string);
  showFor?: "all" | "student" | "teacher";
  isIcon?: boolean;
  icon?: string;
  ariaLabel?: string;
  className?: string;
}

export const publicNavItems: NavItem[] = [
  { label: "About", href: "/#why-bridge-spero" },
  { label: "Explore", href: "/explore-groups" },
  { label: "Contact", href: "/contact" },
];

export const authNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: (role) => (role === "USER" ? "/student" : "/teacher"),
  },
  { label: "My Groups", href: "/my-groups" },
  {
    label: "Create Group",
    href: "/create-group",
    showFor: "teacher",
  },
  { label: "Explore", href: "/explore-groups" },
  { label: "Contact", href: "/contact" },
];

export const authIconItems: NavItem[] = [
  {
    label: "Notifications",
    href: "/notifications",
    isIcon: true,
    icon: "/bell.svg",
    ariaLabel: "Notifications",
  },
  {
    label: "Profile",
    href: "/profile",
    isIcon: true,
    icon: "/user.svg",
    ariaLabel: "Profile",
  },
];

export const mobileIconItems: NavItem[] = [
  {
    label: "Notifications",
    href: "/notifications",
    isIcon: true,
    icon: "/bell.svg",
    ariaLabel: "Notifications",
  },
  {
    label: "Profile",
    href: (role) => (role === "USER" ? "/student-profile" : "/teacher-profile"),
    isIcon: true,
    icon: "/user.svg",
    ariaLabel: "Profile",
  },
  {
    label: "Logout",
    href: "/logout",
    isIcon: true,
    icon: "/log-out-dark.svg",
    ariaLabel: "Logout",
  },
];

export function getNavHref(item: NavItem, role: UserRole): string {
  return typeof item.href === "function" ? item.href(role) : item.href;
}

export function shouldShowItem(item: NavItem, role: UserRole): boolean {
  if (!item.showFor || item.showFor === "all") return true;
  if (item.showFor === "student" && role === "USER") return true;
  if (item.showFor === "teacher" && role === "TEACHER") return true;
  return false;
}
