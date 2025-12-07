"use client";

import { useState, useCallback } from "react";
import { Logo } from "./Logo";
import { SearchInput } from "./SearchInput";
import { SearchModal } from "./SearchModal";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { IconButton } from "./IconButton";
import { JWTPayload } from "@/features/auth/types/authTypes";

interface HeaderProps {
  role: JWTPayload["role"] | null;
  fullName?: string;
}

export function Header({ role, fullName }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = !!role;
  const userRole = role;

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Determine search input visibility classes
  // - Non-auth: visible from lg breakpoint onwards
  // - Auth: visible from lg to xxl, hidden on xxl+ (shows search button instead)
  const searchInputClasses = !isAuthenticated
    ? "hidden lg:flex"
    : "hidden lg:flex xxl:hidden";

    console.log("HEADER ROLE IS: ", role);

  return (
    <>
      <header className="sticky z-50 top-[24px] w-full">
        <div className="container container-header mx-auto">
          <div className="relative flex items-center h-[62px] border-y border-gray-light bg-white">
            <Logo />

            <SearchInput className={searchInputClasses} />

            <IconButton
              icon="/search.svg"
              alt="search icon"
              onClick={openSearch}
              ariaLabel="Open search"
              className="lg:hidden"
            />

            <IconButton
              icon={isMenuOpen ? "/close.svg" : "/menu.svg"}
              alt="menu icon"
              onClick={toggleMenu}
              ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
              className="xxl:hidden"
            />

            <DesktopNav
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onSearchClick={openSearch}
              userName={fullName || "User"}
            />

            <MobileMenu
              isOpen={isMenuOpen}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            />
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}

export default Header;
