import Image from "next/image";

interface GroupMetadataProps {
  duration: number;
  currentStudents: number;
  maxStudents: number;
  startDate: string;
}

function GroupMetadata({
  duration,
  currentStudents,
  maxStudents,
  startDate,
}: GroupMetadataProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-[24px] gap-y-[12.5px] xxl:gap-[54px] xxl:justify-start">
      <div className="flex items-center gap-[8px]">
        <Image
          width={22}
          height={22}
          src={"/clock.svg"}
          alt=""
          className="w-[22px] h-[22px]"
        />
        <span className="text-tertiary">{duration} weeks</span>
      </div>
      <div className="flex items-center gap-[8px]">
        <Image
          width={22}
          height={22}
          src={"/users-1.svg"}
          alt=""
          className="w-[22px] h-[22px]"
        />
        <span className="text-tertiary">
          {currentStudents}/{maxStudents} students
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        <Image
          width={22}
          height={22}
          src={"/calendar.svg"}
          alt=""
          className="w-[22px] h-[22px]"
        />
        <span className="text-tertiary">Starting {startDate}</span>
      </div>
    </div>
  );
}

export default GroupMetadata;
