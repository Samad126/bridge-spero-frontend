"use client";

import Image from "next/image";
import { useSwiper } from "swiper/react";

function NavigationButtons({ currentDay }: { currentDay: string }) {
  const swiper = useSwiper();

  return (
    <div
      slot="container-start"
      className="flex justify-between items-center mb-[24px]"
    >
      <button
        onClick={() => swiper?.slidePrev()}
        className="border border-gray-light p-[12px]"
      >
        <Image
          src={"/chevron-left.svg"}
          alt="chevron left"
          width={22}
          height={22}
          className="w-[22px] h-[22px]"
        />
      </button>
      <h3 className="text-center text-[24px]">{currentDay}</h3>
      <button
        onClick={() => swiper?.slideNext()}
        className="border border-gray-light p-[12px]"
      >
        <Image
          src={"/chevron-right.svg"}
          alt="chevron right"
          width={22}
          height={22}
          className="w-[22px] h-[22px]"
        />
      </button>
    </div>
  );
}

export default NavigationButtons;
