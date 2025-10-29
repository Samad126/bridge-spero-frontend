import Image from "next/image";
import { TeacherCardItem } from "../../homepageTypes";
import Link from "next/link";

function TeacherCard({ experience, profileUrl, star, name }: TeacherCardItem) {
  return (
    <div className="p-[24px] flex-1 border border-gray-light">
      <div className="flex items-center gap-[12px] mb-[24px]">
        <Image
          src={profileUrl}
          width={80}
          height={80}
          alt={`${name} profie picture`}
          className="rounded-full w-[80px] h-[80px] object-cover"
        />
        <div>
          <h5 className="mb-[10px] text-[24px] leading-[130%] font-medium">
            Kamila Sultanli
          </h5>
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
        className="block text-center py-[12px] bg-secondary text-custom-white"
        href={"/profile"}
      >
        View Profile
      </Link>
    </div>
  );
}

export default TeacherCard;
