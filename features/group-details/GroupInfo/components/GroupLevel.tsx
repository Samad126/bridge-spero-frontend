import Image from "next/image";

interface GroupLevelProps {
  category: string;
  language: string;
}

function GroupLevel({ category, language }: GroupLevelProps) {
  return (
    <div className="flex flex-center items-center justify-center mb-[10px] xxl:mb-[12px] xxl:justify-start">
      <span className={`text-tertiary text-[18px] xxl:text-[22px]`}>
        {category}
      </span>
      <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
      <Image
        width={16}
        height={16}
        src={"/globe.svg"}
        alt=""
        className="w-[16px] h-[16px]"
      />
      <span className={`ml-1 text-tertiary text-[18px] xxl:text-[22px]`}>
        {language}
      </span>
    </div>
  );
}

export default GroupLevel;
