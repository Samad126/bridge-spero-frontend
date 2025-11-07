import Image from "next/image";
import { GroupCardItem } from "../../homepageTypes";
import Link from "next/link";

const GroupCard = ({
  imageUrl,
  degree,
  language,
  subjectName,
  teacherName,
  price,
}: GroupCardItem) => {
  return (
    <div className="flex-1 border border-gray-light my-3">
      <div className="relative w-full h-[240px]">
        <Image
          src={imageUrl}
          fill
          alt={`${subjectName} image`}
          className="object-cover"
          sizes="(max-width: 1023px) 350px, (max-width: 1439px) 312px, 336px"
        />
      </div>

      <div className="p-[20px]">
        <div className="flex flex-center items-center">
          <span className="text-tertiary text-[14px]">{degree}</span>
          <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
          <Image
            width={16}
            height={16}
            src={"/globe.svg"}
            alt=""
            className="w-[16px] h-[16px]"
          />
          <span className="ml-1 text-tertiary text-[14px]">{language}</span>
        </div>
        <div className="mb-10 mt-3">
          <h3 className="text-secondary text-[24px]">{subjectName}</h3>
          <p className="text-tertiary text-[14px]">{teacherName}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[20px] text-secondary">{price}$</span>
          <Link
            href="/"
            className="w-[80%] block text-center py-[11px] bg-secondary text-white h-[46px]"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
