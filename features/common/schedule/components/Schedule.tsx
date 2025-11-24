"use client";

import WeekDay from "./WeekDay";
import WeekDayMobile from "./WeekDayMobile";

function Schedule() {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-[32px] items-center justify-between mb-[32px] xxl:mb-[12px] xxl:flex-row">
          <h2 className="text-primary text-[32px] leading-[100%] font-normal">
            Schedule
          </h2>
          <p className="text-secondary text-[24px]">01.02.2025 - 07.02.2025</p>
        </div>
        <div className="p-[24px] border border-gray-light">
          <div className="hidden space-x-[12px] xxl:flex">
            <WeekDay />
            <WeekDay />
            <WeekDay />
            <WeekDay />
            <WeekDay />
            <WeekDay />
            <WeekDay />
          </div>
          <WeekDayMobile />
        </div>
      </div>
    </section>
  );
}

export default Schedule;
