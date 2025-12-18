import React from "react";
import Image from "next/image";

const Notifications = () => {
  return (
    <div className="flex-1 flex flex-col gap-[12px]">
      <div className="p-[20px] border border-gray-light">
        <div className="text-secondary text-[20px] mb-[12px]">
          Lesson starting in 15 minutes
        </div>
        <div className="text-[#626262]">Chemistry</div>
      </div>
      <div className="p-[20px] flex items-center gap-[20px] border border-gray-light">
        <Image
          src={"/kamila-sultanli.jpg"}
          width={54}
          height={54}
          alt="teacher-pp"
          className="rounded-full"
        />
        <div>
          <div className="text-secondary text-[20px] mb-[12px]">
            Kamila Sultanli shared syllabus
          </div>
          <div className="text-[#626262]">Chemistry</div>
        </div>
      </div>
      <div className="p-[20px] border border-gray-light">
        <div className="text-secondary text-[20px] mb-[12px]">
          Lesson starting in 15 minutes
        </div>
        <div className="text-[#626262]">Chemistry</div>
      </div>
      <div className="p-[20px] flex items-center gap-[20px] border border-gray-light">
        <Image
          src={"/kamila-sultanli.jpg"}
          width={54}
          height={54}
          alt="teacher-pp"
          className="rounded-full"
        />
        <div>
          <div className="text-secondary text-[20px] mb-[12px]">
            Kamila Sultanli shared syllabus
          </div>
          <div className="text-[#626262]">Chemistry</div>
        </div>
      </div>
      <div className="p-[20px] border border-gray-light">
        <div className="text-secondary text-[20px] mb-[12px]">
          Lesson starting in 15 minutes
        </div>
        <div className="text-[#626262]">Chemistry</div>
      </div>
      <div className="p-[20px] flex items-center gap-[20px] border border-gray-light">
        <Image
          src={"/kamila-sultanli.jpg"}
          width={54}
          height={54}
          alt="teacher-pp"
          className="rounded-full"
        />
        <div>
          <div className="text-secondary text-[20px] mb-[12px]">
            Kamila Sultanli shared syllabus
          </div>
          <div className="text-[#626262]">Chemistry</div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
