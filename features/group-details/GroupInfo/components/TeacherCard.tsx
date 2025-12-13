import Image from "next/image";
import Link from "next/link";

interface TeacherCardProps {
  name: string;
  profilePicture: string;
  rating: number;
  activeStudents: number;
  teacherId?: number;
}

function TeacherCard({
  name,
  profilePicture,
  rating,
  activeStudents,
  teacherId,
}: TeacherCardProps) {
  const hasProfilePicture = profilePicture && profilePicture.trim() !== '';
  const displayPicture = hasProfilePicture
    ? `${process.env.NEXT_PUBLIC_PAGE_URL}${profilePicture}`
    : "/user.svg";

  return (
    <div className="w-full p-[24px] border border-gray-light mt-[32px] mb-[60px] xxl:mt-[24px] xxl:mb-[32px]">
      <div className="w-full flex flex-col items-center gap-[12px] md:flex-row">
        <div className="flex justify-start">
          <Image
            src={displayPicture}
            width={80}
            height={80}
            alt="Teacher profile picture"
            className={`rounded-full w-[80px] h-[80px] object-cover ${!hasProfilePicture ? 'bg-gray-light p-[17px]' : ''}`}
          />
        </div>
        <div className="w-full flex flex-col items-start min-w-0">
          {teacherId ? (
            <Link className="w-full block" href={`/teachers/${teacherId}`}>
              <h3 className="w-full truncate text-center mb-[10px] text-[24px] leading-[130%] font-medium md:text-left hover:text-primary transition-colors cursor-pointer">
                {name}
              </h3>
            </Link>
          ) : (
            <h3 className="w-full text-center mb-[10px] text-[24px] leading-[130%] font-medium md:text-left">
              {name}
            </h3>
          )}
          <div className="flex items-center">
            <Image
              src="/star.svg"
              width={16}
              height={16}
              alt="Teacher rating"
              className="mr-[6px] w-[16px] h-[16px]"
            />
            <span className="text-custom-yellow font-medium">{rating}</span>
            <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
            <div className="flex items-center gap-[8px]">
              <Image
                src="/users-1.svg"
                width={16}
                height={16}
                alt="Number of students"
                className="mr-[6px] w-[16px] h-[16px]"
              />
              <span className="text-tertiary leading-[130%]">
                {activeStudents} students
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
