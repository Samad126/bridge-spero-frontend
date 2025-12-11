"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useGetUserPublicProfileQuery, useUploadProfilePictureMutation, useUpdateProfilePictureMutation, useUploadBackgroundImageMutation, useUpdateBackgroundImageMutation } from "@/features/profile/api/profileApi";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

const Teachers = [
  {
    id: 1,
    name: "Kamila Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 4.9,
  },
  {
    id: 2,
    name: "Kamila Sultansiz",
    profileUrl: "/kamila-sultanli.jpg",
    star: 1.9,
  },
  {
    id: 3,
    name: "Kama Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 2.9,
  },
  {
    id: 4,
    name: "Kamush Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 3.9,
  },
  {
    id: 5,
    name: "Kamila Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 4.9,
  },
  {
    id: 6,
    name: "Kamila Sultansiz",
    profileUrl: "/kamila-sultanli.jpg",
    star: 1.9,
  },
  {
    id: 7,
    name: "Kama Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 2.9,
  },
  {
    id: 8,
    name: "Kamush Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 3.9,
  },
];

interface StudentProfileProps {
  userId?: number;
}

const StudentProfile = ({ userId }: StudentProfileProps) => {
  // Fetch current logged-in user data
  const { data: currentUser } = useGetUserProfileOptionalQuery();

  // If no userId provided, assume viewing own profile (for logged-in student)
  const profileUserId = userId || currentUser?.id;

  // Fetch user profile data
  const { data: userProfile, isLoading } = useGetUserPublicProfileQuery(
    profileUserId!,
    { skip: !profileUserId }
  );

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.id === profileUserId && currentUser?.role === "USER";
  const isStudentLoggedIn = isOwnProfile;

  // Upload mutations
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);

  const [uploadProfilePicture, { isLoading: isUploadingProfilePic }] = useUploadProfilePictureMutation();
  const [updateProfilePicture, { isLoading: isUpdatingProfilePic }] = useUpdateProfilePictureMutation();
  const [uploadBackgroundImage, { isLoading: isUploadingBg }] = useUploadBackgroundImageMutation();
  const [updateBackgroundImage, { isLoading: isUpdatingBg }] = useUpdateBackgroundImageMutation();

  const [isMobile, setIsMobile] = useState(false);
  const [isSelected, setIsSelected] = useState("teachers");
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeroHovered, setisHeroHovered] = useState(false);
  const [isPpHovered, setIsPpHovered] = useState(false);

  const handleSelectedCategory = (category: string) => {
    setIsSelected(category);
  };

  useEffect(() => {
    // handleSelectedCategory('teachers');
  }, [isSelected]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(Teachers.length / itemsPerPage);
  const paginatedTeachers = Teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle profile picture upload
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (userProfile?.imageUrl) {
        await updateProfilePicture(file).unwrap();
      } else {
        await uploadProfilePicture(file).unwrap();
      }
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };

  // Handle background image upload
  const handleBackgroundImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (userProfile?.backgroundImageUrl) {
        await updateBackgroundImage(file).unwrap();
      } else {
        await uploadBackgroundImage(file).unwrap();
      }
    } catch (error) {
      console.error("Failed to upload background image:", error);
      alert("Failed to upload background image. Please try again.");
    }
  };

  const handleOpenProfilePicture = () => {
    if (isStudentLoggedIn) {
      profilePicInputRef.current?.click();
    }
  };

  const handleOpenBackgroundImage = () => {
    if (isStudentLoggedIn) {
      backgroundImageInputRef.current?.click();
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="container">
        <div className="border border-gray-light">
          <div className="w-full h-[146px] xxl:h-[262px] bg-gray-200 animate-pulse"></div>
          <div className="xxl:flex xxl:p-[30px]">
            <div className="mb-[24px] xxl:w-[314px] flex flex-col gap-[24px] mx-[18px] xxl:mx-0">
              <div className="w-[100px] h-[100px] xxl:w-[178px] xxl:h-[178px] rounded-full bg-gray-200 animate-pulse"></div>
              <div className="h-[40px] bg-gray-200 animate-pulse w-[200px]"></div>
              <div className="h-[100px] bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Helper function to get full image URL
  const getImageUrl = (path: string | undefined | null) => {
    if (!path) return null;
    return `${process.env.NEXT_PUBLIC_PAGE_URL}${path}`;
  };

  const profileImageUrl = getImageUrl(userProfile?.imageUrl);
  const backgroundImageUrl = getImageUrl(userProfile?.backgroundImageUrl) || "/teacher-profile-hero.jpg";

  return (
    <section className="container">
      {/* Hidden file inputs */}
      <input
        ref={profilePicInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        className="hidden"
      />
      <input
        ref={backgroundImageInputRef}
        type="file"
        accept="image/*"
        onChange={handleBackgroundImageChange}
        className="hidden"
      />
      <div className="border border-gray-light">
        <div
          onMouseEnter={isStudentLoggedIn ? () => setisHeroHovered(true) : undefined}
          onMouseLeave={isStudentLoggedIn ? () => setisHeroHovered(false) : undefined}
          onClick={isStudentLoggedIn ? handleOpenBackgroundImage : undefined}
          className={`${isStudentLoggedIn ? 'cursor-pointer' : ''} w-full relative overflow-hidden h-[146px] xxl:h-[262px]`}
        >
          <Image
            src={backgroundImageUrl}
            alt="student-profile-hero"
            fill
            className="object-cover"
          />
          {isStudentLoggedIn && (
            <>
              <div
                className={`xxl:${
                  isHeroHovered ? "block" : "hidden"
                } absolute inset-0 bg-[#00000099] z-10 block`}
              ></div>
              <Image
                src={"/camera_white.svg"}
                width={22}
                height={22}
                alt=""
                className={`xxl:${
                  isHeroHovered ? "block" : "hidden"
                } absolute block inset-0 m-auto cursor-pointer z-20`}
              />
            </>
          )}
        </div>
        <div className="xxl:flex xxl:p-[30px]">
          <div className="mb-[24px] xxl:w-[314px] mt-[-34px] xxl:mt-[-99px] flex flex-col justify-center items-center xxl:justify-start xxl:items-start gap-[24px] mx-[18px] xxl:mx-0">
            <div
              onClick={isStudentLoggedIn ? handleOpenProfilePicture : undefined}
              onMouseEnter={isStudentLoggedIn ? () => setIsPpHovered(true) : undefined}
              onMouseLeave={isStudentLoggedIn ? () => setIsPpHovered(false) : undefined}
              className={`relative ${isStudentLoggedIn ? 'cursor-pointer' : ''} xxl:size-[178px] w-[100px] h-[100px] object-cover z-20 mx-auto xxl:mx-0`}
            >
              <Image
                src={profileImageUrl || "/user.svg"}
                alt="student"
                width={178}
                height={178}
                className={`relative z-20 w-[100px] h-[100px] xxl:w-[178px] xxl:h-[178px] rounded-full bg-gray-light ${
                  profileImageUrl ? "p-0" : "xxl:p-[38px] p-[21px]"
                }`}
              />
              {isStudentLoggedIn && (
                <>
                  <div
                    className={`xxl:${
                      isPpHovered ? "block" : "hidden"
                    } block absolute inset-0 bg-[#00000099] rounded-full z-30`}
                  ></div>
                  <Image
                    src={"/camera_white.svg"}
                    width={22}
                    height={22}
                    alt=""
                    className={`xxl:${
                      isPpHovered ? "block" : "hidden"
                    } block absolute inset-0 m-auto cursor-pointer z-40`}
                  />
                </>
              )}
            </div>
            <div>
              <h3 className="text-[32px] text-secondary leading-[130%] font-medium">
                {userProfile?.name || ''} {userProfile?.surname || ''}
              </h3>
            </div>

            <p className="text-start">
              {userProfile?.bio || ''}
            </p>
            {isStudentLoggedIn ? (
              <button className="bg-secondary text-white py-[12px] px-[42px] cursor-pointer">
                Edit Profile Info
              </button>
            ) : null}
          </div>

          <div className="xxl:flex-1 flex flex-col gap-[24px] items-center px-[12px] pb-[12px] xxl:p-0">
            {/* Only show teachers tab for public view */}
            {!isStudentLoggedIn && (
              <>
                <div className="flex items-center w-full select-none">
                  <div className="text-primary text-center border-b py-[12px] flex-1">
                    Teachers {Teachers.length}
                  </div>
                </div>

                <div>
                  <div className="grid w-full grid-cols-2 xxl:grid-cols-3 mb-[24px] gap-[12px]">
                    {paginatedTeachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="border border-1 border-gray-light p-[24px]"
                      >
                        <div className="xxl:mb-[24px] mb-[12px] xxl:flex-row flex flex-col gap-[12px] items-center">
                          <div>
                            <Image
                              width={80}
                              height={80}
                              className="rounded-full"
                              src={teacher.profileUrl}
                              alt="The photo of the teacher"
                            />
                          </div>
                          <div>
                            <div className="xxl:text-[24px] text-[18px] text-secondary leading-[130%] font-medium break-all">
                              {teacher.name}
                            </div>
                            <div className="flex gap-[6px] items-center">
                              <Image
                                src={"/star.svg"}
                                width={16}
                                height={16}
                                alt={`star`}
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-custom-yellow font-medium">
                                4.9
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="cursor-pointer bg-secondary text-white py-[12px] w-full">
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`
                        w-[40px] h-[40px] font-medium border-gray-light text flex items-center justify-center cursor-pointer
                        ${
                          currentPage === page
                            ? "bg-secondary text-white"
                            : "text-secondary"
                        }
                      `}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="w-[40px] h-[40px] border border-gray-light flex items-center justify-center cursor-pointer disabled:opacity-40"
                    >
                      <Image
                        src="/arrow-right.svg"
                        width={22}
                        height={22}
                        alt="right-arrow"
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
