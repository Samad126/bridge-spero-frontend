import Image from "next/image";
import { useState } from "react";

interface ScheduleEntry {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

function Schedule() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([
    { id: "1", day: "", startTime: "", endTime: "" },
  ]);

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      { id: Date.now().toString(), day: "", startTime: "", endTime: "" },
    ]);
  };

  const removeSchedule = (id: string) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    }
  };

  const updateSchedule = (
    id: string,
    field: keyof ScheduleEntry,
    value: string
  ) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  return (
    <div className="flex-1 w-full">
      <label className="block mb-[8px]">Schedule *</label>
      <div className="space-y-[12px]">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="flex items-center gap-[12px]">
            <select
              value={schedule.day}
              onChange={(e) =>
                updateSchedule(schedule.id, "day", e.target.value)
              }
              className="h-[43px] px-[12px] outline-0 border border-gray-light flex-1"
            >
              <option value="">Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>

            <div className="flex items-center gap-[8px]">
              <Image
                src="/clock.svg"
                alt="clock"
                width={20}
                height={20}
                className="min-w-[20px] h-[20px]"
              />
              <input
                type="time"
                value={schedule.startTime}
                onChange={(e) =>
                  updateSchedule(schedule.id, "startTime", e.target.value)
                }
                className="h-[43px] px-[12px] outline-0 border border-gray-light w-[100px]"
              />
            </div>

            <span className="text-gray-400">-</span>

            <div className="flex items-center gap-[8px]">
              <Image
                src="/clock.svg"
                alt="clock"
                width={20}
                height={20}
                className="min-w-[20px] h-[20px]"
              />
              <input
                type="time"
                value={schedule.endTime}
                onChange={(e) =>
                  updateSchedule(schedule.id, "endTime", e.target.value)
                }
                className="h-[43px] px-[12px] outline-0 border border-gray-light w-[100px]"
              />
            </div>

            <button
              type="button"
              onClick={() => removeSchedule(schedule.id)}
              disabled={schedules.length === 1}
              className="h-[43px] w-[43px] flex items-center justify-center border border-gray-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/trash-2.svg"
                alt="delete"
                width={20}
                height={20}
                className="min-w-[20px] h-[20px]"
              />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSchedule}
          className="w-full h-[43px] flex items-center justify-center gap-[12px] border border-gray-light text-secondary"
        >
          <Image
            src="/plus.svg"
            alt="plus"
            width={20}
            height={20}
            className="min-w-[20px] h-[20px]"
          />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}

export default Schedule;
