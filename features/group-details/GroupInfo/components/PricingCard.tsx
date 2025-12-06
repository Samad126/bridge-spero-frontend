"use client";
import Image from "next/image";
import { useState } from "react";
import { UserProfile } from "@/features/profile/api/userProfileApi";
import { useCheckIsJoinedQuery } from "../../api/groupDetailsApi";
import Link from "next/link";

interface PricingCardProps {
  price: number;
  groupId: string;
  user?: UserProfile;
  teacherId: number;
}

function PricingCard({ price, groupId, user, teacherId }: PricingCardProps) {
  const [isOpened, setIsOpened] = useState(true);

  // Check if user is joined (only if user is authenticated and is a student)
  const { data: isJoinedData } = useCheckIsJoinedQuery(Number(groupId), {
    skip: !user || user.role !== "USER",
  });

  const isJoined = isJoinedData?.isJoined || false;
  const isTeacher = user?.role === "TEACHER";

  console.log("PRICING CARD USER ROLE: ", user?.role);

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
          <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

          <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
            <div className="flex justify-between gap-[12px]">
              <Link
                href={`/edit-group/${groupId}`}
                className="p-[12px] border border-tertiary flex items-center justify-center"
              >
                <Image src="/edit-2.svg" alt="edit" width={22} height={22} />
              </Link>
              <button className="p-[12px] border border-tertiary">
                <Image src="/trash-2.svg" alt="delete" width={22} height={22} />
              </button>
              <button className="p-[12px] border border-tertiary">
                <Image src="/share.svg" alt="share" width={22} height={22} />
              </button>
            </div>

            <p className="text-[32px] mb-[12px] mt-[20px] text-white">
              ${price} / <span className="text-[20px]">month</span>
            </p>

            <button className="w-full bg-white text-secondary py-[12px] text-[18px]">
              Start Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Student/Public view
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
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

        <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
          <div className="flex justify-between">
            <button className="p-[12px] border border-tertiary">
              <Image src="/heart.svg" alt="heart" width={22} height={22} />
            </button>
            <button className="p-[12px] border border-tertiary">
              <Image src="/share.svg" alt="share" width={22} height={22} />
            </button>
          </div>

          <p className="text-[32px] mb-[12px] mt-[20px] text-white">
            ${price} / <span className="text-[20px]">month</span>
          </p>

          <button className="w-full bg-white text-secondary py-[12px] text-[18px]">
            {isJoined ? "Already Enrolled" : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
