"use client";
import Image from "next/image";
import { useState } from "react";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import {
  useCheckIsJoinedQuery,
  useJoinGroupMutation,
} from "../../api/groupDetailsApi";
import {
  useLazyGetZoomAuthorizeQuery,
  useLazyVerifyZoomConnectionQuery,
  useLazyStartLessonQuery,
  useLazyJoinLessonQuery,
} from "@/features/zoom/api/zoomApi";
import Link from "next/link";
import PricingCardSkeleton from "./PricingCardSkeleton";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  price: number;
  groupId: string;
  teacherId: number;
  imageUrl?: string;
}

function PricingCard({ price, groupId, teacherId, imageUrl }: PricingCardProps) {
  const [isOpened, setIsOpened] = useState(true);
  const [isStartingLesson, setIsStartingLesson] = useState(false);
  const router = useRouter();

  // Construct the full image URL
  const backgroundImage = imageUrl
    ? `${process.env.NEXT_PUBLIC_PAGE_URL}${imageUrl}`
    : '/groupimage.png';

  // Fetch user data using RTK Query (optional auth - won't redirect if not authenticated)
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery(undefined, {
    
  });

  // Check if user is joined (only if user is authenticated and is a student)
  // const { data: isJoinedData } = useCheckIsJoinedQuery(Number(groupId), {
  //   skip: !userData || userData.role !== "USER",
  // });

  // const isJoined = isJoinedData?.isJoined || false;
  const isJoined = true;

  const [joinGroup, { isLoading: isJoining }] = useJoinGroupMutation();
  const [getZoomAuthorize] = useLazyGetZoomAuthorizeQuery();
  const [verifyZoomConnection] = useLazyVerifyZoomConnectionQuery();
  const [startLessonTrigger] = useLazyStartLessonQuery();
  const [joinLessonTrigger] = useLazyJoinLessonQuery();

  // const isJoined = isJoinedData?.isJoined || false;
  const isTeacher = userData?.role === "TEACHER" && userData?.id === teacherId;

  const handleJoinGroup = async () => {
    try {
      await joinGroup(Number(groupId)).unwrap();
      console.log("Successfully joined group");
      router.refresh();
    } catch (error) {
      console.error("Failed to join group:", error);
      alert("Failed to join group. Please try again.");
    }
  };

  const handleStartLesson = async () => {
    setIsStartingLesson(true);
    try {
      // First, verify Zoom connection
      const verifyResult = await verifyZoomConnection();
      const isConnected = verifyResult.data?.connected;

      if (!isConnected) {
        // If not connected, fetch authorization URL and open it in new tab
        const authorizeResult = await getZoomAuthorize();

        if (authorizeResult.data) {
          // Extract the redirect URL from the "redirect:URL" format
          const authorizeUrl = authorizeResult.data.replace(/^redirect:/, '');
          window.open(authorizeUrl, '_blank');
          alert('Please authorize Zoom in the opened tab, then try starting the lesson again.');
        } else {
          alert('Failed to get Zoom authorization URL. Please try again.');
        }
        setIsStartingLesson(false);
        return;
      }

      // If connected, start the lesson
      const result = await startLessonTrigger(Number(groupId));

      if (result.data) {
        // Open Zoom URL in new tab
        window.open(result.data, '_blank');
      } else {
        alert('Failed to get Zoom meeting URL. Please try again.');
      }
    } catch (error) {
      console.error('Failed to start lesson:', error);
      alert('Failed to start lesson. Please try again.');
    } finally {
      setIsStartingLesson(false);
    }
  };

  const handleJoinLesson = async () => {
    // Check if student is joined to the group
    if (!isJoined) {
      alert('You must enroll in this group before joining a lesson.');
      return;
    }

    setIsStartingLesson(true);
    try {
      // Join the lesson
      const result = await joinLessonTrigger(Number(groupId));

      if (result.data) {
        // Open Zoom URL in new tab
        window.open(result.data, '_blank');
      } else {
        alert('Failed to get Zoom meeting URL. Please try again.');
      }
    } catch (error) {
      console.error('Failed to join lesson:', error);
      alert('Failed to join lesson. Please try again.');
    } finally {
      setIsStartingLesson(false);
    }
  };

  // Show loading skeleton while fetching user data
  if (isLoading) {
    return <PricingCardSkeleton isOpened={isOpened} />;
  }

  // Teacher view (if user is the owner of the group)
  if (isTeacher) {
    return (
      <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-10 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
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
              {/* <button className="p-[12px] border border-tertiary">
                <Image src="/share.svg" alt="share" width={22} height={22} />
              </button> */}
              <button className="flex items-center justify-center w-[46px] h-[46px] border border-tertiary">
                <Image
                  src="/trash-2-light.svg"
                  alt="delete"
                  width={22}
                  height={22}
                />
              </button>
            </div>

            <p className="text-[32px] mb-[12px] mt-[30px] text-white">
              ${price} / <span className="text-[20px]">month</span>
            </p>

            <div className="flex gap-[12px]">
              <button className="p-[12px] min-w-[46px] border border-tertiary">
                <Image src="/share.svg" alt="share" width={22} height={22} />
              </button>
              <button
                onClick={handleStartLesson}
                disabled={isStartingLesson}
                className="w-full bg-white text-secondary h-[46px] text-[18px] disabled:opacity-50"
              >
                {isStartingLesson ? "Starting..." : "Start Lesson"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = !!userData;

  // Non-logged-in user view
  if (!isAuthenticated) {
    return (
      <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-10 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
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
              <button className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary">
                <Image src="/share.svg" alt="logout" width={22} height={22} />
              </button>
            </div>

            <p className="text-[32px] mb-[12px] mt-[30px] text-white">
              ${price} / <span className="text-[20px]">month</span>
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
    <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-10 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
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
            <Link
              href="/api/logout"
              className="w-[46px] h-[46px] flex items-center justify-center border border-tertiary"
            >
              <Image src="/log-out.svg" alt="logout" width={22} height={22} />
            </Link>
          </div>

          <p className="text-[32px] mb-[12px] mt-[30px] text-white">
            ${price} / <span className="text-[20px]">month</span>
          </p>

          <div className="flex gap-[12px]">
            <button className="p-[12px] min-w-[46px] border border-tertiary">
              <Image src="/share.svg" alt="share" width={22} height={22} />
            </button>
            <button
              onClick={isJoined ? handleJoinLesson : handleJoinGroup}
              disabled={isJoining || isStartingLesson}
              className="w-full bg-white text-secondary h-[46px] text-[18px] disabled:opacity-50"
            >
              {isJoining
                ? "Joining..."
                : isStartingLesson
                ? "Starting..."
                : isJoined
                ? "Join Lesson"
                : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
