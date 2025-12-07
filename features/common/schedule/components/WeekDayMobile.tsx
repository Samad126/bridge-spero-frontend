import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import LessonCard from "./LessonCard";
import { ScheduleDay } from "@/features/dashboard/student/types/dashboardTypes";
import "swiper/css";

interface WeekDayMobileProps {
  schedule: ScheduleDay[];
}

function WeekDayMobile({ schedule }: WeekDayMobileProps) {
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
        <h3 className="text-center text-[24px]">
          {schedule[activeIndex]?.dayOfWeek || "No Schedule"}
        </h3>
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
        {schedule.map((day) => (
          <SwiperSlide key={day.dayOfWeek}>
            <div className="flex flex-col gap-[12px]">
              {day.groups.length === 0 ? (
                <div className="text-center text-secondary text-[14px] py-[20px]">
                  No lessons
                </div>
              ) : (
                day.groups.map((group) => (
                  <LessonCard
                    key={group.id}
                    time={group.time}
                    groupName={group.groupName}
                    groupId={group.id}
                  />
                ))
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WeekDayMobile;
