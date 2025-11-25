"use client";
import Image from "next/image";
import { useState } from "react";

function PricingCard() {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-10 xxl:sticky xxl:top-0 xxl:min-w-[403px]">
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
        className={`relative border w-full bg-[url('/groupimage.png')] bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] ${
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
              <Image src="/share.svg" alt="heart" width={22} height={22} />
            </button>
          </div>

          <p className="text-[32px] mb-[12px] mt-[20px] text-white">
            $19.99 / <span className="text-[20px]">month</span>
          </p>

          <button className="w-full bg-white text-secondary py-[12px] text-[18px]">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
