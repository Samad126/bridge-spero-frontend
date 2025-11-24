import Image from "next/image";
import Link from "next/link";
import { TeacherCardItem } from "../../types/teacherListTypes";

interface TeacherCardProps extends TeacherCardItem {
  col?: 1 | 2;
}

function TeacherCard({ experience, profileUrl, star, name, col = 1 }: TeacherCardProps) {
  // For 2-column mobile view: vertical layout (image on top)
  // For 1-column mobile view and tablet/desktop: horizontal layout (image on left)
  const containerLayout = col === 2
    ? "flex-col md:flex-row"
    : "flex-row";

  const imageContainerClass = col === 2
    ? "flex justify-center md:justify-start"
    : "flex justify-start";

  const contentContainerClass = col === 2
    ? "flex flex-col items-center md:items-start"
    : "flex flex-col items-start";

  // Name text size: 18px for mobile 2-col, 24px for mobile 1-col and tablet/desktop
  const nameSize = col === 2
    ? "text-[18px] md:text-[24px]"
    : "text-[24px]";

  return (
    <div className="p-[24px] flex-1 border border-gray-light">
      <div className={`flex ${containerLayout} items-center gap-[12px] mb-[24px]`}>
        <div className={imageContainerClass}>
          <Image
            src={profileUrl}
            width={80}
            height={80}
            alt={`${name} profile picture`}
            className="rounded-full w-[80px] h-[80px] object-cover"
          />
        </div>
        <div className={contentContainerClass}>
          <h3 className={`mb-[10px] ${nameSize} leading-[130%] font-medium`}>
            {name}
          </h3>
          <div className="flex items-center">
            <Image
              src={"/star.svg"}
              width={16}
              height={16}
              alt={`${name} star`}
              className="mr-[6px] w-[16px] h-[16px]"
            />
            <span className="text-custom-yellow font-medium">{star}</span>
            <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
            <span className="text-tertiary leading-[130%]">{experience}</span>
          </div>
        </div>
      </div>
      <Link
        className="block text-center text-[18px] py-[12px] bg-secondary text-custom-white"
        href={"/"}
      >
        View Profile
      </Link>
    </div>
  );
}

export default TeacherCard;
