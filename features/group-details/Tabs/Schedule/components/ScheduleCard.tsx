import Image from "next/image";
import { useState } from "react";

function ScheduleCard({
  cardStatus,
}: {
  cardStatus: "student-view" | "teacher-view" | "add";
}) {
  const [isFormMode, setIsFormMode] = useState(false);

  return (
    <div className="border flex items-center border-gray-light">
      {isFormMode ? (
        <div className="p-[24px] flex items-center justify-between w-full gap-[28px]">
          <div className="w-[186px]">
            <select className="w-full border-b border-secondary text-[20px] mb-[12px]">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <div className="flex items-center border-b border-secondary overflow-auto max-w-[186px] whitespace-nowrap">
              <Image src={"/clock.svg"} alt="clock" width={22} height={22} />
              <p className="ml-[8px]">
                <span className="text-gray-light">00</span> :{" "}
                <span className="text-gray-light">00</span>
              </p>
              <span className="mx-[10px]">-</span>
              <Image src={"/clock.svg"} alt="clock" width={22} height={22} />
              <p className="ml-[8px]">
                <span className="text-gray-light">00</span> :{" "}
                <span className="text-gray-light">00</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFormMode(false)}
            className="flex items-center justify-center p-[6px]"
          >
            <Image
              src={"/check.svg"}
              alt="check"
              width={22}
              height={22}
              className="min-w-[22px] h-[22px]"
            />
          </button>
        </div>
      ) : (
        <>
          {(cardStatus === "teacher-view" || cardStatus === "student-view") && (
            <div className="w-full p-[24px] flex justify-between items-center">
              <div>
                <h4 className="text-[20px] mb-[12px] leading-[100%]">Monday</h4>
                <p>12:00 - 14:00</p>
              </div>
              {cardStatus === "teacher-view" && (
                <div className="flex flex-col justify-between gap-[12px]">
                  <button onClick={() => setIsFormMode(true)}>
                    <Image
                      src={"/edit-2.svg"}
                      alt="edit"
                      width={22}
                      height={22}
                    />
                  </button>
                  <button>
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
              className="p-[24px] flex gap-[12px] w-full h-full items-center"
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
