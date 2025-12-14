import Image from "next/image";
import { useState } from "react";
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} from "@/features/group-details/api/groupDetailsApi";
import { ScheduleItem } from "@/features/group-details/types/groupDetailsTypes";

interface ScheduleCardProps {
  cardStatus: "student-view" | "teacher-view" | "add";
  scheduleData?: ScheduleItem;
  groupId: number;
}

function ScheduleCard({
  cardStatus,
  scheduleData,
  groupId,
}: ScheduleCardProps) {
  const [isFormMode, setIsFormMode] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState(
    scheduleData?.dayOfWeek || "Monday"
  );

  // Parse initial time values
  const parseTime = (time: string) => {
    if (!time) return { hours: "09", minutes: "00" };
    const [h, m] = time.split(":");
    return { hours: h.padStart(2, "0"), minutes: m.padStart(2, "0") };
  };

  const startTimeParsed = parseTime(scheduleData?.startTime || "");
  const endTimeParsed = parseTime(scheduleData?.endTime || "");

  const [startHours, setStartHours] = useState(startTimeParsed.hours);
  const [startMinutes, setStartMinutes] = useState(startTimeParsed.minutes);
  const [endHours, setEndHours] = useState(endTimeParsed.hours);
  const [endMinutes, setEndMinutes] = useState(endTimeParsed.minutes);

  const [createSchedule, { isLoading: isCreating }] =
    useCreateScheduleMutation();
  const [updateSchedule, { isLoading: isUpdating }] =
    useUpdateScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleting }] =
    useDeleteScheduleMutation();

  const handleSave = async () => {
    const startTime = `${startHours}:${startMinutes}`;
    const endTime = `${endHours}:${endMinutes}`;

    try {
      if (cardStatus === "add") {
        await createSchedule({
          groupId,
          data: { dayOfWeek, startTime, endTime },
        }).unwrap();
      } else if (scheduleData) {
        await updateSchedule({
          scheduleId: scheduleData.id,
          data: { dayOfWeek, startTime, endTime },
        }).unwrap();
      }
      setIsFormMode(false);
      // Reset form for add mode
      if (cardStatus === "add") {
        setDayOfWeek("Monday");
        setStartHours("09");
        setStartMinutes("00");
        setEndHours("10");
        setEndMinutes("00");
      }
    } catch (error) {
      console.error("Failed to save schedule:", error);
      alert("Failed to save schedule. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!scheduleData) return;

    if (!confirm("Are you sure you want to delete this schedule?")) {
      return;
    }

    try {
      await deleteSchedule(scheduleData.id).unwrap();
    } catch (error) {
      console.error("Failed to delete schedule:", error);
      alert("Failed to delete schedule. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsFormMode(false);
    // Reset to original values
    if (scheduleData) {
      setDayOfWeek(scheduleData.dayOfWeek);
      const startParsed = parseTime(scheduleData.startTime);
      const endParsed = parseTime(scheduleData.endTime);
      setStartHours(startParsed.hours);
      setStartMinutes(startParsed.minutes);
      setEndHours(endParsed.hours);
      setEndMinutes(endParsed.minutes);
    } else {
      setDayOfWeek("Monday");
      setStartHours("09");
      setStartMinutes("00");
      setEndHours("10");
      setEndMinutes("00");
    }
  };

  const isLoading = isCreating || isUpdating || isDeleting;

  return (
    <div className="border flex items-center border-gray-light">
      {isFormMode ? (
        <div className="p-[20px] flex items-center justify-between w-full gap-[5px]">
          <div className="w-full">
            <select
              className="w-full border-b border-secondary text-[20px] mb-[12px] pb-[8px] outline-0 bg-transparent"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              disabled={isLoading}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <div className="flex items-center gap-[6px]">
              <div className="flex justify-between items-center border-b border-secondary flex-1 pb-[8px] gap-[2px] min-w-0">
                <Image
                  src={"/clock.svg"}
                  alt="clock"
                  width={18}
                  height={18}
                  className="shrink-0"
                />
                <select
                  value={startHours}
                  onChange={(e) => setStartHours(e.target.value)}
                  className="ml-[2px] outline-0 text-[14px] bg-transparent min-w-0 max-w-[40px] pr-[2px]"
                  disabled={isLoading}
                >
                  {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className="text-[14px]">:</span>
                <select
                  value={startMinutes}
                  onChange={(e) => setStartMinutes(e.target.value)}
                  className="outline-0 text-[14px] bg-transparent min-w-0 max-w-[40px] pr-[2px]"
                  disabled={isLoading}
                >
                  {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <span className="text-[14px] shrink-0">-</span>
              <div className="flex justify-between items-center border-b border-secondary flex-1 pb-[8px] gap-[2px] min-w-0">
                <Image
                  src={"/clock.svg"}
                  alt="clock"
                  width={18}
                  height={18}
                  className="shrink-0"
                />
                <select
                  value={endHours}
                  onChange={(e) => setEndHours(e.target.value)}
                  className="ml-[2px] outline-0 text-[14px] bg-transparent min-w-0 max-w-[40px] pr-[2px]"
                  disabled={isLoading}
                >
                  {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className="text-[14px]">:</span>
                <select
                  value={endMinutes}
                  onChange={(e) => setEndMinutes(e.target.value)}
                  className="outline-0 text-[14px] bg-transparent min-w-0 max-w-[40px] pr-[2px]"
                  disabled={isLoading}
                >
                  {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <button
              onClick={handleSave}
              className="flex items-center justify-center p-[6px] disabled:opacity-50"
              disabled={isLoading}
            >
              <Image
                src={"/check.svg"}
                alt="save"
                width={22}
                height={22}
                className="min-w-[22px] h-[22px]"
              />
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center p-[6px] disabled:opacity-50"
              disabled={isLoading}
            >
              <Image
                src={"/close.svg"}
                alt="cancel"
                width={22}
                height={22}
                className="min-w-[22px] h-[22px]"
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          {(cardStatus === "teacher-view" || cardStatus === "student-view") &&
            scheduleData && (
              <div className="w-full p-[24px] flex justify-between items-center">
                <div>
                  <h4 className="text-[20px] mb-[12px] leading-[100%]">
                    {scheduleData.dayOfWeek}
                  </h4>
                  <p>
                    {scheduleData.startTime} - {scheduleData.endTime}
                  </p>
                </div>
                {cardStatus === "teacher-view" && (
                  <div className="flex flex-col justify-between gap-[12px]">
                    <button
                      onClick={() => setIsFormMode(true)}
                      disabled={isLoading}
                      className="disabled:opacity-50"
                    >
                      <Image
                        src={"/edit-2.svg"}
                        alt="edit"
                        width={22}
                        height={22}
                      />
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="disabled:opacity-50"
                    >
                      <Image
                        src={"/trash-2.svg"}
                        alt="delete"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            )}
          {cardStatus === "add" && (
            <button
              onClick={() => setIsFormMode(true)}
              className="p-[24px] flex gap-[12px] w-full h-full items-center disabled:opacity-50"
              disabled={isLoading}
            >
              <Image src={"/plus.svg"} alt="plus" width={22} height={22} />
              <span className="text-[20px]">Add</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ScheduleCard;
