import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import LessonCard from "./LessonCard";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function WeekDayMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="xxl:hidden">
      <div className="flex justify-between items-center mb-[24px]">
        <button
          onClick={() => swiperInstance?.slidePrev()}
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
        <h3 className="text-center text-[24px]">{DAYS[activeIndex]}</h3>
        <button
          onClick={() => swiperInstance?.slideNext()}
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
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        spaceBetween={24}
        autoHeight
      >
        {DAYS.map((day, index) => (
          <SwiperSlide key={day}>
            <div className="flex flex-col gap-[12px]">
              <LessonCard />
              <LessonCard />
              {index === 0 && <LessonCard />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WeekDayMobile;
