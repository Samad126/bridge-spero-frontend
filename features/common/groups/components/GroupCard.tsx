import Image from "next/image";
import Link from "next/link";
import { GroupCardItem } from "../types/groupListTypes";

interface GroupCardProps extends GroupCardItem {
  col?: 1 | 2;
}

const GroupCard = ({
  id,
  imageUrl,
  degree,
  language,
  subjectName,
  teacherName,
  price,
  col = 1,
}: GroupCardProps) => {
  // Adjust styles based on column layout (only for mobile)
  const imageHeight = col === 1 ? "h-[240px] md:h-[240px]" : "h-[120px] md:h-[240px]";
  const imageSizes = col === 1
    ? "(max-width: 1023px) 350px, (max-width: 1439px) 312px, 336px"
    : "(max-width: 1023px) 169px, (max-width: 1439px) 312px, 336px)";

  // Mobile-only responsive classes
  const padding = col === 1 ? "p-[20px] md:p-[20px]" : "p-[12px] md:p-[20px]";
  const textSize = col === 1 ? "text-[14px] md:text-[14px]" : "text-[12px] md:text-[14px]";
  const titleSize = col === 1 ? "text-[24px] md:text-[24px]" : "text-[20px] md:text-[24px]";
  const marginBottom = col === 1 ? "mb-[24px] mt-[12px]" : "mb-[12px] mt-[6px] md:mb-[24px] md:mt-[12px]";
  const fullPath = imageUrl ? `${process.env.NEXT_PUBLIC_PAGE_URL}${imageUrl}` : "/none.png";

  // Format language to display with first letter uppercase only
  const formattedLanguage = language
    ? language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()
    : "";

  return (
    <div className="flex-1 border border-gray-light">
      <div className={`relative w-full ${imageHeight}`}>
        <Image
          src={fullPath}
          fill
          alt={`${subjectName} image`}
          className="object-cover"
          sizes={imageSizes}
        />
      </div>

      <div className={padding}>
        <div className="flex flex-center items-center">
          <span className={`text-tertiary ${textSize}`}>{degree}</span>
          <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
          <Image
            width={16}
            height={16}
            src={"/globe.svg"}
            alt=""
            className="w-[16px] h-[16px]"
          />
          <span className={`ml-1 text-tertiary ${textSize}`}>{formattedLanguage}</span>
        </div>
        <div className={marginBottom}>
          <h3 className={`text-secondary ${titleSize}`}>{subjectName}</h3>
          <p className={`text-tertiary ${textSize}`}>{teacherName}</p>
        </div>
        <div className="flex justify-between items-center gap-[24px]">
          <span className="text-[20px] text-secondary">{price}₼</span>
          <Link
            href={id ? `/groups/${id}` : "#"}
            className="w-[80%] text-[18px] block text-center bg-secondary text-white py-[12px]"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
