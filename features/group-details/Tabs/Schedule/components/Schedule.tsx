"use client";

import ScheduleCard from "./ScheduleCard";
import { useGetGroupScheduleQuery } from "@/features/group-details/api/groupDetailsApi";

interface ScheduleProps {
  groupId: string;
  isGroupOwner: boolean;
}

function Schedule({ groupId, isGroupOwner }: ScheduleProps) {
  const { data: scheduleData, isLoading, error } = useGetGroupScheduleQuery(Number(groupId));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
        <div className="border border-gray-light p-[24px] animate-pulse">
          <div className="h-[20px] bg-gray-light rounded mb-[12px]"></div>
          <div className="h-[16px] bg-gray-light rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-[24px]">
        Failed to load schedule. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      {scheduleData && scheduleData.length > 0 && (
        scheduleData.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            cardStatus={isGroupOwner ? "teacher-view" : "student-view"}
            scheduleData={schedule}
            groupId={Number(groupId)}
          />
        ))
      )}
      {isGroupOwner && (
        <ScheduleCard cardStatus="add" groupId={Number(groupId)} />
      )}
    </div>
  );
}

export default Schedule;
