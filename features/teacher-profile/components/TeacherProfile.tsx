"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useGetTeacherPublicProfileQuery, useUploadProfilePictureMutation, useUpdateProfilePictureMutation, useUploadBackgroundImageMutation, useUpdateBackgroundImageMutation, useUploadDemoVideoMutation, useGetTeacherGroupsQuery } from "@/features/profile/api/profileApi";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import GroupCard from "@/features/common/groups/components/GroupCard";
import RateModal from "./RateModal";
import ProfileActions from "./ProfileActions";
import SidebarPrompts from "./SidebarPrompts";
import EditProfileModal from "@/features/profile/components/EditProfileModal";

interface TeacherProfileProps {
  teacherId?: number;
}

const TeacherProfile = ({ teacherId }: TeacherProfileProps) => {
  // Fetch current logged-in user data
  const { data: currentUser } = useGetUserProfileOptionalQuery();

  // If no teacherId provided, assume viewing own profile (for logged-in teacher)
  const profileTeacherId = teacherId || currentUser?.id;

  // Fetch teacher profile data
  const { data: teacherProfile, isLoading } = useGetTeacherPublicProfileQuery(
    profileTeacherId!,
    { skip: !profileTeacherId }
  );

  // Fetch teacher groups
  const { data: teacherGroups = [], isLoading: isLoadingGroups } = useGetTeacherGroupsQuery(
    profileTeacherId!,
    { skip: !profileTeacherId }
  );

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.id === profileTeacherId && currentUser?.role === "TEACHER";
  const isTeacherLoggedIn = isOwnProfile;

  // Upload mutations
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);
  const demoVideoInputRef = useRef<HTMLInputElement>(null);

  const [uploadProfilePicture, { isLoading: isUploadingProfilePic }] = useUploadProfilePictureMutation();
  const [updateProfilePicture, { isLoading: isUpdatingProfilePic }] = useUpdateProfilePictureMutation();
  const [uploadBackgroundImage, { isLoading: isUploadingBg }] = useUploadBackgroundImageMutation();
  const [updateBackgroundImage, { isLoading: isUpdatingBg }] = useUpdateBackgroundImageMutation();
  const [uploadDemoVideo, { isLoading: isUploadingVideo }] = useUploadDemoVideoMutation();

  const [isZoomConnected, setIsZoomConnected] = useState(true);
  const [isBecomeStudent, setIsBecomeStudent] = useState(true);
  const [isSelected, setIsSelected] = useState("demo");
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeroHovered, setisHeroHovered] = useState(false);
  const [isPpHovered, setIsPpHovered] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);


  const itemsPerPage = 8;
  const totalPages = Math.ceil(teacherGroups.length / itemsPerPage);

  const paginatedGroups = teacherGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectedCategory = (category: string) => {
    setIsSelected(category);
  };

  const openRateModule = () => {
    setShowRateModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeRateModule = () => {
    setShowRateModal(false);
    document.body.style.overflow = "unset";
  };

  // Handle profile picture upload
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (teacherProfile?.imageUrl) {
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
      if (teacherProfile?.backgroundImageUrl) {
        await updateBackgroundImage(file).unwrap();
      } else {
        await uploadBackgroundImage(file).unwrap();
      }
    } catch (error) {
      console.error("Failed to upload background image:", error);
      alert("Failed to upload background image. Please try again.");
    }
  };

  // Handle demo video upload
  const handleDemoVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadDemoVideo(file).unwrap();
    } catch (error) {
      console.error("Failed to upload demo video:", error);
      alert("Failed to upload demo video. Please try again.");
    }
  };

  const handleOpenProfilePicture = () => {
    if (isTeacherLoggedIn) {
      profilePicInputRef.current?.click();
    }
  };

  const handleOpenBackgroundImage = () => {
    if (isTeacherLoggedIn) {
      backgroundImageInputRef.current?.click();
    }
  };

  const handleOpenDemoVideo = () => {
    if (isTeacherLoggedIn) {
      demoVideoInputRef.current?.click();
    }
  };



  // Show loading state
  if (isLoading) {
    return (
      <section className="container flex flex-col gap-[24px] xxl:flex-row">
        <div className="border border-1 border-gray-light flex flex-col xxl:flex-1">
          <div className="w-full h-[146px] xxl:h-[262px] bg-gray-200 animate-pulse"></div>
          <div className="p-[30px] flex flex-col gap-[24px]">
            <div className="w-[178px] h-[178px] rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-[40px] bg-gray-200 animate-pulse w-[200px]"></div>
            <div className="h-[100px] bg-gray-200 animate-pulse"></div>
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

  const profileImageUrl = getImageUrl(teacherProfile?.imageUrl);
  const backgroundImageUrl = getImageUrl(teacherProfile?.backgroundImageUrl) || "/teacher-profile-hero.jpg";

  return (
    <section className="container flex flex-col gap-[24px] xxl:flex-row">
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
      <input
        ref={demoVideoInputRef}
        type="file"
        accept="video/*"
        onChange={handleDemoVideoChange}
        className="hidden"
      />
      <div className="border border-gray-light flex flex-col xxl:flex-1">
        <div
          onClick={isTeacherLoggedIn ? handleOpenBackgroundImage : undefined}
          onMouseEnter={isTeacherLoggedIn ? () => setisHeroHovered(true) : undefined}
          onMouseLeave={isTeacherLoggedIn ? () => setisHeroHovered(false) : undefined}
          className={`${isTeacherLoggedIn ? 'cursor-pointer' : ''} w-full relative overflow-hidden h-[146px] xxl:h-[262px]`}
        >
          <Image
            src={backgroundImageUrl}
            alt="teacher-profile-hero"
            fill
            className="object-cover"
          />
          {isTeacherLoggedIn && (
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

        <div className="flex xxl:flex-row flex-col p-[12px] xxl:p-[30px] xxl:gap-[30px] xxl:justify-start xxl:items-start">
          <div className="relative w-fit xxl:w-[314px] mx-auto xxl:mx-0 flex flex-col justify-center items-center xxl:items-start xxl:pl-0 pl-[24px] gap-[24px]">
            <div
              onClick={isTeacherLoggedIn ? handleOpenProfilePicture : undefined}
              onMouseEnter={isTeacherLoggedIn ? () => setIsPpHovered(true) : undefined}
              onMouseLeave={isTeacherLoggedIn ? () => setIsPpHovered(false) : undefined}
              className={`relative ${isTeacherLoggedIn ? 'cursor-pointer' : ''} xxl:size-[178px] w-[100px] h-[100px] mt-[-50px] xxl:mt-[-96px] object-cover z-20 mx-auto xxl:mx-0`}
            >
              <Image
                src={profileImageUrl || "/user.svg"}
                alt="teacher"
                width={178}
                height={178}
                className={`relative z-20 w-[100px] h-[100px] xxl:w-[178px] xxl:h-[178px] rounded-full bg-gray-light ${
                  profileImageUrl ? "p-0" : "xxl:p-[38px] p-[21px]"
                }`}
              />
              {isTeacherLoggedIn && (
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
              <h3 className="text-[32px] text-secondary text-center leading-[130%] font-medium xxl:text-left mb-[12px]">
                {teacherProfile?.name || ''} {teacherProfile?.surname || ''}
              </h3>
              <div className="xxl:w-[200px] w-[185px] xxl:w-max flex items-center mx-auto xxl:mx-0">
                <Image
                  src={"/star.svg"}
                  width={16}
                  height={16}
                  alt={`star`}
                  className="mr-[6px] w-[16px] h-[16px]"
                />
                <span className="text-custom-yellow">{teacherProfile?.rating?.toFixed(1) || '0.0'}</span>
                <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
                <Image
                  src={"/users-1.svg"}
                  width={16}
                  height={16}
                  alt={`students`}
                  className="mr-[8px] w-[18px] h-[18px]"
                />
                <span className="text-tertiary">{teacherProfile?.students || 0} students</span>
              </div>
            </div>

            <p className="text-center xxl:text-left w-full">
              {teacherProfile?.bio || ''}
            </p>
            <ProfileActions
              isOwnProfile={isTeacherLoggedIn}
              isBecomeStudent={isBecomeStudent}
              isLoggedIn={!!currentUser}
              onRateClick={openRateModule}
              onEditClick={() => setShowEditModal(true)}
            />
          </div>
          <div className="mt-[24px] xxl:mt-0 w-full xxl:min-w-[570px]">
            <div className="flex items-center w-full select-none mb-[24px] border-b border-gray-light">
              <div
                onClick={() => handleSelectedCategory("demo")}
                className={`${
                  isSelected === "demo" ? "text-primary border-b-2 border-primary" : "text-secondary"
                } text-center py-[12px] flex-1 cursor-pointer transition-colors`}
              >
                Demo Lesson
              </div>
              <div
                onClick={() => handleSelectedCategory("groups")}
                className={`${
                  isSelected === "groups" ? "text-primary border-b-2 border-primary" : "text-secondary"
                } text-center py-[12px] flex-1 cursor-pointer transition-colors`}
              >
                Groups {teacherGroups.length}
              </div>
            </div>
            {isSelected === "demo" ? (
              <div className="relative w-full h-[159px] xxl:w-[570px] xxl:h-[278px]">
                {teacherProfile?.demoVideoUrl ? (
                  <video
                    src={getImageUrl(teacherProfile.demoVideoUrl) || undefined}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={"/demo-lesson.jpg"}
                      alt="demo-lesson"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#00000099]"></div>
                    {isTeacherLoggedIn && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={handleOpenDemoVideo}
                          disabled={isUploadingVideo}
                          className="border border-[#EBEBEB] p-[12px] bg-black/50 hover:bg-black/70 disabled:opacity-50"
                        >
                          <Image
                            src={"/upload-white.svg"}
                            alt="upload icon"
                            width={46}
                            height={46}
                          />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div>
                {isLoadingGroups ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-[12px] mb-[24px]">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="border border-gray-light animate-pulse">
                        <div className="w-full h-[120px] md:h-[240px] bg-gray-200"></div>
                        <div className="p-[12px] md:p-[20px] space-y-[12px]">
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
                  <div className={`grid grid-cols-2 ${isZoomConnected && isBecomeStudent ? "xxl:grid-cols-4" : "xxl:grid-cols-2"} gap-[12px] mb-[24px]`}>
                    {paginatedGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        imageUrl={group.imageUrl || ""}
                        degree={group.category}
                        language={group.language}
                        subjectName={group.name}
                        teacherName={`${group.teacherName} ${group.teacherSurname}`}
                        price={group.price}
                        col={2}
                      />
                    ))}
                  </div>
                )}

                {!isLoadingGroups && paginatedGroups.length > 0 && totalPages > 1 && (
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
              </div>
            )}
          </div>
        </div>
      </div>
      {isTeacherLoggedIn && (
        <SidebarPrompts
          isZoomConnected={isZoomConnected}
          isBecomeStudent={isBecomeStudent}
        />
      )}
      {profileTeacherId && (
        <RateModal
          isOpen={showRateModal}
          onClose={closeRateModule}
          teacherId={profileTeacherId}
        />
      )}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profileType="teacher"
        currentData={{
          name: teacherProfile?.name || "",
          surname: teacherProfile?.surname || "",
          email: teacherProfile?.email || "",
          phone: teacherProfile?.phone || "",
          bio: teacherProfile?.bio || "",
        }}
      />
    </section>
  );
};

export default TeacherProfile;
