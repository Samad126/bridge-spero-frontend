"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useGetUserPublicProfileQuery, useUploadProfilePictureMutation, useUpdateProfilePictureMutation, useUploadBackgroundImageMutation, useUpdateBackgroundImageMutation, useGetUserGroupsQuery } from "@/features/profile/api/profileApi";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import GroupCard from "@/features/common/groups/components/GroupCard";
import EditProfileModal from "@/features/profile/components/EditProfileModal";

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

  // Fetch user groups
  const { data: userGroups = [], isLoading: isLoadingGroups } = useGetUserGroupsQuery(
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeroHovered, setisHeroHovered] = useState(false);
  const [isPpHovered, setIsPpHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(userGroups.length / itemsPerPage);
  const paginatedGroups = userGroups.slice(
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
        <div className="xxl:flex xxl:p-[30px] xxl:gap-[30px]">
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
            <div className="w-full">
              <h3 className="truncate text-[32px] text-secondary leading-[130%] font-medium">
                {userProfile?.name || ''} {userProfile?.surname || ''}
              </h3>
            </div>

            <p className="text-start">
              {userProfile?.bio || ''}
            </p>
            {isStudentLoggedIn ? (
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-secondary text-white py-[12px] px-[42px] cursor-pointer"
              >
                Edit Profile Info
              </button>
            ) : null}
          </div>

          <div className="xxl:flex-1 flex flex-col gap-[24px] items-center px-[12px] pb-[12px] xxl:p-0">
            <div className="flex items-center w-full select-none">
              <div className="text-primary text-center border-b py-[12px] flex-1">
                Groups {userGroups.length}
              </div>
            </div>

            <div className="w-full">
              {isLoadingGroups ? (
                <div className="grid w-full grid-cols-2 xxl:grid-cols-3 mb-[24px] gap-[12px]">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border border-gray-light animate-pulse">
                      <div className="w-full h-[120px] bg-gray-200"></div>
                      <div className="p-[12px] xxl:p-[24px] space-y-[12px]">
                        <div className="h-[14px] bg-gray-200 w-3/4"></div>
                        <div className="h-[24px] bg-gray-200 w-full"></div>
                        <div className="h-[40px] bg-gray-200 w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedGroups.length === 0 ? (
                <div className="text-center py-[40px] text-tertiary">
                  No groups available
                </div>
              ) : (
                <>
                  <div className="grid w-full grid-cols-2 xxl:grid-cols-4 mb-[24px] gap-[12px]">
                    {paginatedGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        imageUrl={group.imageUrl || ""}
                        degree={group.category}
                        language={group.language}
                        subjectName={group.name}
                        teacherName={group.teacherName}
                        price={group.price}
                        col={2}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
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
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profileType="student"
        currentData={{
          name: userProfile?.name || "",
          surname: userProfile?.surname || "",
          email: userProfile?.email || "",
          phone: userProfile?.phone || "",
          bio: userProfile?.bio || "",
        }}
      />
    </section>
  );
};

export default StudentProfile;
