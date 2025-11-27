export type UserRole = "student" | "teacher" | null;

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
  { label: "About", href: "/" },
  { label: "Explore", href: "/" },
  { label: "Contact", href: "/" },
];

export const authNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: (role) => (role === "student" ? "/student" : "/teacher"),
  },
  { label: "My Groups", href: "/my-groups" },
  {
    label: "Create Group",
    href: "/create-group",
    showFor: "student",
  },
  { label: "Explore", href: "/explore" },
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

export function getNavHref(item: NavItem, role: UserRole): string {
  return typeof item.href === "function" ? item.href(role) : item.href;
}

export function shouldShowItem(item: NavItem, role: UserRole): boolean {
  if (!item.showFor || item.showFor === "all") return true;
  return item.showFor === role;
}
