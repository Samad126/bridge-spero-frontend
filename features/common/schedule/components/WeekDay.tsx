import LessonCard from "./LessonCard";
import { ScheduleGroup } from "@/features/dashboard/student/types/dashboardTypes";

interface WeekDayProps {
  dayOfWeek: string;
  groups: ScheduleGroup[];
}

function WeekDay({ dayOfWeek, groups }: WeekDayProps) {
  return (
    <div className="pt-[8px] flex-1">
      <h3 className="text-center mb-[24px] text-[24px]">{dayOfWeek}</h3>
      <div className="flex flex-col gap-[12px]">
        {groups.length === 0 ? (
          <div className="text-center text-secondary text-[14px] py-[20px]">
            No lessons
          </div>
        ) : (
          groups.map((group) => (
            <LessonCard
              key={group.id}
              time={group.time}
              groupName={group.groupName}
              groupId={group.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default WeekDay;
