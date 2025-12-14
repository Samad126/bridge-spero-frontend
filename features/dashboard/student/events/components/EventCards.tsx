import Image from "next/image";
import Link from "next/link";
import { StudentEventTypes } from "../types/studentEventTypes";

const EventCard = ({
  groupId,
  time,
  endTime,
  isActive,
  subjectName,
  teacherName,
  joinUrl,
  status,
}: StudentEventTypes) => {
  // Check if current time is between startTime and endTime
  const isWithinTimeRange = () => {
    // If endTime is not available, always allow access (backward compatibility)
    if (!endTime) return true;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

    // Parse start time (format: "HH:MM")
    const [startHour, startMinute] = time.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;

    // Parse end time (format: "HH:MM")
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const endMinutes = endHour * 60 + endMinute;

    return currentTime >= startMinutes && currentTime <= endMinutes;
  };

  const canJoinLesson = isActive && joinUrl && isWithinTimeRange();

  return (
    <div className="w-full h-[270px] p-[24px] border border-gray-light lg:h-[169px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <Image width={22} height={22} src={"/clock.svg"} alt="" />
          <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
            {endTime ? `${time} - ${endTime}` : time}
          </span>
        </div>
        <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
          {isActive ? "active" : status}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[6px] mt-5 mb-19 lg:mb-0 lg:mt-12">
          <Link href={`/groups/${groupId}`}>
            <h3 className="text-[22px] text-primary leading-[100%] tracking-[0%] hover:underline cursor-pointer">
              {subjectName}
            </h3>
          </Link>
          <div>
            <span className="text-tertiary">{teacherName}</span>
          </div>
        </div>
        <div className="flex items-center gap-[12px] lg:mt-12 lg:flex-row-reverse">
          {canJoinLesson ? (
            <a href={joinUrl} target="_blank" rel="noopener noreferrer">
              <button className="h-[46px] w-[186px] bg-secondary text-white hover:bg-secondary/90">
                Join Lesson
              </button>
            </a>
          ) : (
            <button
              disabled
              className="h-[46px] w-[186px] bg-secondary text-white opacity-50 cursor-not-allowed"
            >
              Join Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
