"use client";
import Image from "next/image";
import { useState } from "react";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
// import { useCheckIsJoinedQuery } from "../../api/groupDetailsApi";
import Link from "next/link";
import PricingCardSkeleton from "./PricingCardSkeleton";

interface PricingCardProps {
  price: number;
  groupId: string;
  teacherId: number;
}

function PricingCard({ price, groupId }: PricingCardProps) {
  const [isOpened, setIsOpened] = useState(true);

  // Fetch user data using RTK Query (optional auth - won't redirect if not authenticated)
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery();

  // Check if user is joined (only if user is authenticated and is a student)
  // const { data: isJoinedData } = useCheckIsJoinedQuery(Number(groupId), {
  //   skip: !userData || userData.role !== "USER",
  // });

  // const isJoined = isJoinedData?.isJoined || false;
  const isJoined = true;
  const isTeacher = userData?.role === "TEACHER";

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
          className={`relative w-full bg-[url('/groupimage.png')] bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
            isOpened ? "py-[30px]" : "h-[6px]"
          }`}
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
              <button className="w-full bg-white text-secondary h-[46px] text-[18px]">
                Start Lesson
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
          className={`relative w-full bg-[url('/groupimage.png')] bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
            isOpened ? "py-[30px]" : "h-[6px]"
          }`}
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

            <button className="w-full bg-white text-secondary h-[46px] text-[18px]">
              Enroll Now
            </button>
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
        className={`relative w-full bg-[url('/groupimage.png')] bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
          isOpened ? "py-[30px]" : "h-[6px]"
        }`}
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
            <button className="w-full bg-white text-secondary h-[46px] text-[18px]">
              {isJoined ? "Join Lesson" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
