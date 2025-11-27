"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserRole = "student" | "teacher" | null;

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // TODO: Replace with actual auth state from your auth context/provider
  // Test different states by changing these values:
  // - isAuthenticated = false: Shows search input on desktop, About/Explore/Contact/Login/Sign Up
  // - isAuthenticated = true + userRole = "student": Hides search input on desktop, shows Dashboard/My Groups/Create Group/Explore/Contact + icons
  // - isAuthenticated = true + userRole = "teacher": Hides search input on desktop, shows Dashboard/My Groups/Explore/Contact + icons (no Create Group)
  const isAuthenticated = true; // Change to true to test authenticated state
  const userRole: UserRole = "student"; // Change to "teacher" to test teacher view

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky z-50 top-[24px] w-full">
        <div className="container container-header mx-auto">
          <div className="relative flex items-center h-[62px] border-y border-gray-light bg-white">
            <Link
              href={"/"}
              className="flex items-center gap-[7px] pl-[16.25px] w-full min-w-[230px] border-x border-gray-light h-full lg:min-w-[250px] lg:pl-[25px]"
            >
              <div>
                <div className="relative w-[54px] h-[27px] lg:w-[72px] lg:h-[36px]">
                  <Image
                    src={"/logo.svg"}
                    alt="main logo"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 54px, 72px"
                  />
                </div>
              </div>
              <p className="font-bold text-[22px]">
                Bridge<span className="text-primary">Spero</span>
              </p>
            </Link>
            {/* Search input - visible for all users on tablet/medium desktop (lg to xxl), only non-auth on xxl+ */}
            <div className={`hidden w-full h-full border-r border-gray-light ${!isAuthenticated ? 'lg:flex' : 'lg:flex xxl:hidden'}`}>
              <label
                className="flex justify-center items-center cursor-text h-full pl-[20px] pr-[12px]"
                htmlFor="search"
              >
                <Image
                  src={"/search.svg"}
                  alt="search icon"
                  width={22}
                  height={22}
                  loading="eager"
                  className="min-w-[22px] min-h-[22px]"
                />
              </label>
              <input
                type="search"
                placeholder="Search"
                className="outline-none placeholder:text-secondary h-full w-full pr-[20px]"
                id="search"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      router.push(`/explore?search=${encodeURIComponent(value.trim())}`);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
            {/* Search button - visible on mobile for all users */}
            <button
              className="w-full max-w-[62px] border-r border-gray-light flex justify-center items-center cursor-pointer h-full lg:hidden"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Image
                src={"/search.svg"}
                alt="search icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </button>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-full max-w-[62px] flex justify-center items-center h-full border-r border-gray-light xxl:hidden"
            >
              <Image
                src={isMenuOpen ? "/close.svg" : "/menu.svg"}
                alt="menu icon"
                width={22}
                height={22}
                loading="eager"
                className="min-w-[22px] min-h-[22px]"
              />
            </button>
            <nav className="h-full">
              <ul className="hidden xxl:flex h-full items-center">
                {!isAuthenticated ? (
                  <>
                    {/* Non-authenticated navigation */}
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/"}
                      >
                        About
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/"}
                      >
                        Explore
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/"}
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[102px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/"}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[102px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light bg-secondary text-custom-white"
                        href={"/"}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Authenticated navigation */}
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={userRole === "student" ? "/student" : "/teacher"}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/my-groups"}
                      >
                        My Groups
                      </Link>
                    </li>
                    {userRole === "student" && (
                      <li className="w-full h-full min-w-[165px]">
                        <Link
                          className="h-full text-center flex items-center justify-center border-r border-gray-light"
                          href={"/create-group"}
                        >
                          Create Group
                        </Link>
                      </li>
                    )}
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/explore"}
                      >
                        Explore
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[165px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/contact"}
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[62px]">
                      <button
                        className="h-full text-center flex items-center justify-center border-r border-gray-light w-full"
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                      >
                        <Image
                          src={"/search.svg"}
                          alt="search"
                          width={22}
                          height={22}
                          loading="eager"
                          className="min-w-[22px] min-h-[22px]"
                        />
                      </button>
                    </li>
                    <li className="w-full h-full min-w-[62px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/notifications"}
                        aria-label="Notifications"
                      >
                        <Image
                          src={"/bell.svg"}
                          alt="notifications"
                          width={22}
                          height={22}
                          loading="eager"
                          className="min-w-[22px] min-h-[22px]"
                        />
                      </Link>
                    </li>
                    <li className="w-full h-full min-w-[62px]">
                      <Link
                        className="h-full text-center flex items-center justify-center border-r border-gray-light"
                        href={"/profile"}
                        aria-label="Profile"
                      >
                        <Image
                          src={"/user.svg"}
                          alt="profile"
                          width={22}
                          height={22}
                          loading="eager"
                          className="min-w-[22px] min-h-[22px]"
                        />
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {isMenuOpen && (
              <div className="absolute right-0 top-full w-full sm:max-w-[390px] xxl:hidden border-x bg-white border-b border-t border-gray-light">
                <nav>
                  {!isAuthenticated ? (
                    <>
                      {/* Non-authenticated mobile menu */}
                      <ul className="flex flex-col" id="topMenu">
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/"}
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/"}
                          >
                            Explore
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/"}
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                      <ul className="flex justify-between" id="bottomMenu">
                        <li className="flex-1">
                          <Link
                            className="block py-[20px] text-center"
                            href={"/"}
                          >
                            Login
                          </Link>
                        </li>
                        <li className="flex-1">
                          <Link
                            className="block py-[20px] bg-secondary text-custom-white text-center"
                            href={"/"}
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      {/* Authenticated mobile menu */}
                      <ul className="flex flex-col" id="topMenu">
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light text-primary"
                            href={userRole === "student" ? "/student" : "/teacher"}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/my-groups"}
                          >
                            My Groups
                          </Link>
                        </li>
                        {userRole === "student" && (
                          <li>
                            <Link
                              className="block p-[20px] border-b border-gray-light"
                              href={"/create-group"}
                            >
                              Create Group
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/explore"}
                          >
                            Explore
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block p-[20px] border-b border-gray-light"
                            href={"/contact"}
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                      <ul className="flex justify-between border-t border-gray-light" id="bottomMenu">
                        <li className="flex-1 border-r border-gray-light">
                          <Link
                            className="flex justify-center items-center py-[20px]"
                            href={"/notifications"}
                            aria-label="Notifications"
                          >
                            <Image
                              src={"/bell.svg"}
                              alt="notifications"
                              width={22}
                              height={22}
                              loading="eager"
                              className="min-w-[22px] min-h-[22px]"
                            />
                          </Link>
                        </li>
                        <li className="flex-1">
                          <Link
                            className="flex justify-center items-center py-[20px]"
                            href={"/profile"}
                            aria-label="Profile"
                          >
                            <Image
                              src={"/user.svg"}
                              alt="profile"
                              width={22}
                              height={22}
                              loading="eager"
                              className="min-w-[22px] min-h-[22px]"
                            />
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-100 flex items-start justify-center pt-[100px]"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-white w-full max-w-[600px] mx-4 border border-gray-light shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center border-b border-gray-light">
                <div className="flex justify-center items-center h-full pl-[20px] pr-[12px]">
                  <Image
                    src={"/search.svg"}
                    alt="search icon"
                    width={22}
                    height={22}
                    loading="eager"
                    className="min-w-[22px] min-h-[22px]"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search and press Enter..."
                  className="outline-none placeholder:text-secondary h-full w-full py-[20px] pr-[20px] text-[18px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-[20px] py-[20px] hover:bg-gray-100"
                  aria-label="Close search"
                >
                  <Image
                    src={"/close.svg"}
                    alt="close"
                    width={22}
                    height={22}
                    loading="eager"
                    className="min-w-[22px] min-h-[22px]"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
