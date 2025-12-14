"use client";
import Image from "next/image";
import { useState } from "react";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import {
  useCheckIsMemberQuery,
  useJoinGroupMutation,
  useDeleteMemberMutation,
  useDeleteGroupMutation,
} from "../../api/groupDetailsApi";
import {
  useLazyStartJitsiLessonQuery,
  useLazyJoinJitsiLessonQuery,
} from "@/features/jitsi/api/jitsiApi";
import Link from "next/link";
import PricingCardSkeleton from "./PricingCardSkeleton";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils/errorDisplay";

interface JitsiPricingCardProps {
  price: number;
  groupId: string;
  teacherId: number;
  imageUrl?: string;
}

function JitsiPricingCard({ price, groupId, teacherId, imageUrl }: JitsiPricingCardProps) {
  const [isOpened, setIsOpened] = useState(true);
  const [isStartingLesson, setIsStartingLesson] = useState(false);
  const router = useRouter();

  // Construct the full image URL
  const backgroundImage = imageUrl
    ? `${process.env.NEXT_PUBLIC_PAGE_URL}${imageUrl}`
    : '/group-template.svg';

  // Fetch user data using RTK Query (optional auth - won't redirect if not authenticated)
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery(undefined, {

  });

  // Check if user is a member (skip only if not authenticated or if user is the teacher owner)
  const isTeacher = userData?.role === "TEACHER" && userData?.id === teacherId;
  const { data: isMemberData } = useCheckIsMemberQuery(Number(groupId), {
    skip: !userData || isTeacher,
  });

  const isMember = isMemberData?.isMember || false;

  const [joinGroup, { isLoading: isJoining }] = useJoinGroupMutation();
  const [deleteMember, { isLoading: isLeaving }] = useDeleteMemberMutation();
  const [startJitsiLessonTrigger] = useLazyStartJitsiLessonQuery();
  const [joinJitsiLessonTrigger] = useLazyJoinJitsiLessonQuery();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleJoinGroup = async () => {
    try {
      await joinGroup(Number(groupId)).unwrap();
      console.log("Successfully joined group");
      router.refresh();
    } catch (error) {
      handleApiError(error, "Join Group");
    }
  };

  const handleStartLesson = async () => {
    setIsStartingLesson(true);
    try {
      // Start the Jitsi lesson - returns URL as string
      const result = await startJitsiLessonTrigger(Number(groupId));

      if (result.error) {
        handleApiError(result.error, "Start Lesson");
      } else if (result.data) {
        // Open Jitsi URL in new tab
        window.open(result.data, '_blank');
      } else {
        alert('Failed to get Jitsi meeting URL. Please try again.');
      }
    } catch (error) {
      handleApiError(error, "Start Lesson");
    } finally {
      setIsStartingLesson(false);
    }
  };

  const handleJoinLesson = async () => {
    // Check if student is a member of the group
    if (!isMember) {
      alert('You must enroll in this group before joining a lesson.');
      return;
    }

    setIsStartingLesson(true);
    try {
      // Join the Jitsi lesson - returns URL as string
      const result = await joinJitsiLessonTrigger(Number(groupId));

      if (result.error) {
        handleApiError(result.error, "Join Lesson");
      } else if (result.data) {
        // Open Jitsi URL in new tab
        window.open(result.data, '_blank');
      } else {
        alert('The lesson has not been started yet. Please wait for the teacher to start the lesson.');
      }
    } catch (error) {
      handleApiError(error, "Join Lesson");
    } finally {
      setIsStartingLesson(false);
    }
  };

  const handleLeaveGroup = async () => {
    if (!showLeaveConfirm) {
      setShowLeaveConfirm(true);
      return;
    }

    if (!userData?.id) {
      alert('Unable to leave group. Please try again.');
      return;
    }

    try {
      await deleteMember({ groupId: Number(groupId), studentId: userData.id }).unwrap();
      console.log("Successfully left group");
      setShowLeaveConfirm(false);
      router.refresh();
    } catch (error) {
      handleApiError(error, "Leave Group");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bridge Spero Group',
          text: 'Check out this group on Bridge Spero!',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
        alert('Failed to copy link. Please try again.');
      }
    }
  };

  const handleDeleteGroup = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      await deleteGroup(Number(groupId)).unwrap();
      console.log("Group deleted successfully");
      router.push('/teacher');
    } catch (error) {
      handleApiError(error, "Delete Group");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  // Show loading skeleton while fetching user data
  if (isLoading) {
    return <PricingCardSkeleton isOpened={isOpened} />;
  }

  // Teacher view (if user is the owner of the group)
  if (isTeacher) {
    return (
      <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-5 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
        <button
          className="bg-secondary py-[6px] px-[12px] xxl:hidden"
          onClick={() => setIsOpened(!isOpened)}
        >
          <Image
            src="/chevron-down.svg"
            alt="close"
            width={22}
            height={22}
            className={`transition-transform ${isOpened ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`relative w-full bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
            isOpened ? "py-[30px]" : "h-[6px]"
          }`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

          <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
            <div className="flex justify-between gap-[12px]">
              <Link
                href={`/edit-group/${groupId}`}
                className="w-[46px] h-[46px] border border-tertiary flex items-center justify-center"
              >
                <Image
                  src="/edit-2-light.svg"
                  alt="edit"
                  width={22}
                  height={22}
                />
              </Link>
              <button
                onClick={handleDeleteGroup}
                disabled={isDeleting}
                className="flex items-center justify-center w-[46px] h-[46px] border border-tertiary hover:bg-red-600/10 disabled:opacity-50"
              >
                <Image
                  src="/trash-2-light.svg"
                  alt="delete"
                  width={22}
                  height={22}
                />
              </button>
            </div>

            <p className="text-[32px] mb-[12px] mt-[30px] text-white">
              {price}₼ / <span className="text-[20px]">month</span>
            </p>

            <button
              onClick={handleStartLesson}
              disabled={isStartingLesson}
              className="w-full bg-white text-secondary h-[46px] text-[18px] disabled:opacity-50"
            >
              {isStartingLesson ? "Starting..." : "Start Lesson"}
            </button>
          </div>
        </div>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-lg max-w-md">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this group? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteGroup}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = !!userData;

  // Non-logged-in user view
  if (!isAuthenticated) {
    return (
      <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-5 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
        <button
          className="bg-secondary py-[6px] px-[12px] xxl:hidden"
          onClick={() => setIsOpened(!isOpened)}
        >
          <Image
            src="/chevron-down.svg"
            alt="close"
            width={22}
            height={22}
            className={`transition-transform ${isOpened ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`relative w-full bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
            isOpened ? "py-[30px]" : "h-[6px]"
          }`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

          <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
            <div className="flex justify-between gap-[12px]">
              <button className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary">
                <Image src="/heart.svg" alt="heart" width={22} height={22} />
              </button>
              <button
                onClick={handleShare}
                className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary"
              >
                <Image src="/share.svg" alt="share" width={22} height={22} />
              </button>
            </div>

            <p className="text-[32px] mb-[12px] mt-[30px] text-white">
              {price}₼ / <span className="text-[20px]">month</span>
            </p>

            <Link
              href={"/login"}
              className="w-full bg-white text-secondary h-[46px] text-[18px] disabled:opacity-50 flex items-center justify-center"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Student (logged-in) view
  return (
    <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-5 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
      <button
        className="bg-secondary py-[6px] px-[12px] xxl:hidden"
        onClick={() => setIsOpened(!isOpened)}
      >
        <Image
          src="/chevron-down.svg"
          alt="close"
          width={22}
          height={22}
          className={`transition-transform ${isOpened ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`relative w-full bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
          isOpened ? "py-[30px]" : "h-[6px]"
        }`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

        <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
          <div className="flex justify-between gap-[12px]">
            {isMember ? (
              <button
                onClick={handleLeaveGroup}
                disabled={isLeaving}
                className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary disabled:opacity-50"
              >
                <Image src="/log-out.svg" alt="leave group" width={22} height={22} />
              </button>
            ) : (
              <button className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary">
                <Image src="/heart.svg" alt="heart" width={22} height={22} />
              </button>
            )}
            <button
              onClick={handleShare}
              className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary"
            >
              <Image src="/share.svg" alt="share" width={22} height={22} />
            </button>
          </div>

          <p className="text-[32px] mb-[12px] mt-[30px] text-white">
            ₼{price} / <span className="text-[20px]">month</span>
          </p>

          <button
            onClick={isMember ? handleJoinLesson : handleJoinGroup}
            disabled={isJoining || isStartingLesson || isLeaving}
            className="w-full bg-white text-secondary h-[46px] text-[18px] disabled:opacity-50"
          >
            {isJoining
              ? "Joining..."
              : isStartingLesson
              ? "Starting..."
              : isLeaving
              ? "Leaving..."
              : isMember
              ? "Join Lesson"
              : "Enroll Now"}
          </button>
        </div>
      </div>
      {showLeaveConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-semibold mb-4">Leave Group</h3>
            <p className="mb-6">Are you sure you want to leave this group?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveGroup}
                disabled={isLeaving}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLeaving ? "Leaving..." : "Leave"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JitsiPricingCard;
