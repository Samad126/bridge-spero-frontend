"use client";

import WeekDay from "./WeekDay";
import WeekDayMobile from "./WeekDayMobile";
import ScheduleSkeleton from "./ScheduleSkeleton";
import { useGetStudentScheduleQuery } from "@/features/dashboard/student/api/studentDashboardApi";
import { useGetTeacherScheduleQuery } from "@/features/dashboard/teacher/api/teacherDashboardApi";
import { ScheduleDay } from "@/features/dashboard/student/types/dashboardTypes";

interface ScheduleProps {
  userRole?: "student" | "teacher";
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const normalizeSchedule = (apiSchedule: ScheduleDay[]): ScheduleDay[] => {
  const scheduleMap = new Map(
    apiSchedule.map(day => [day.dayOfWeek, day])
  );

  return WEEKDAYS.map(dayOfWeek =>
    scheduleMap.get(dayOfWeek) || {
      dayOfWeek,
      groups: []
    }
  );
};

function Schedule({ userRole = "student" }: ScheduleProps) {
  // Use the appropriate query based on user role
  const studentQuery = useGetStudentScheduleQuery(undefined, {
    skip: userRole !== "student",
  });
  const teacherQuery = useGetTeacherScheduleQuery(undefined, {
    skip: userRole !== "teacher",
  });

  const { data, isLoading, error } = userRole === "student" ? studentQuery : teacherQuery;

  if (isLoading) {
    return <ScheduleSkeleton />;
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-red-500 text-[20px]">Failed to load schedule</div>
          </div>
        </div>
      </section>
    );
  }

  const schedule = data?.schedule || [];
  const normalizedSchedule = normalizeSchedule(schedule);

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-[32px] items-center justify-between mb-[32px] xxl:mb-[12px] xxl:flex-row">
          <h2 className="text-primary text-[32px] leading-[100%] font-normal">
            Schedule
          </h2>
          <p className="text-secondary text-[24px]">{data?.date || "No date available"}</p>
        </div>
        <div className="p-[24px] border border-gray-light">
          <>
            <div className="hidden space-x-[12px] xxl:flex">
              {normalizedSchedule.map((day) => (
                <WeekDay
                  key={day.dayOfWeek}
                  dayOfWeek={day.dayOfWeek}
                  groups={day.groups}
                />
              ))}
            </div>
            <WeekDayMobile schedule={normalizedSchedule} />
          </>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
