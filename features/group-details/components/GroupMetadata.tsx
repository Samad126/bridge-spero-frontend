import Image from "next/image";

function GroupMetadata() {
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
        <span className="text-tertiary">12 weeks</span>
      </div>
      <div className="flex items-center gap-[8px]">
        <Image
          width={22}
          height={22}
          src={"/users-1.svg"}
          alt=""
          className="w-[22px] h-[22px]"
        />
        <span className="text-tertiary">25/30 students</span>
      </div>
      <div className="flex items-center gap-[8px]">
        <Image
          width={22}
          height={22}
          src={"/calendar.svg"}
          alt=""
          className="w-[22px] h-[22px]"
        />
        <span className="text-tertiary">Starting 09.12.2025</span>
      </div>
    </div>
  );
}

export default GroupMetadata;
