import Image from "next/image";

interface LessonCardProps {
  time: string;
  groupName: string;
  groupId: number;
}

function LessonCard({ time, groupName, groupId }: LessonCardProps) {
  return (
    <div className="p-[12px] flex flex-col justify-between border border-gray-light min-h-[71px] xxl:min-h-[90px]">
      <div className="flex items-center gap-[6px] mb-[6px]">
        <Image
          src={"/clock.svg"}
          alt=""
          width={22}
          height={22}
          className="w-[22px] h-[22px]"
        />
        <span className="text-secondary leading-[100%] font-urbanist">{time}</span>
      </div>
      <h3 className="text-primary font-normal text-[16px] font-urbanist leading-[100%]">
        {groupName}
      </h3>
    </div>
  );
}

export default LessonCard;
