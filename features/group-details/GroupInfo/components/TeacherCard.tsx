import Image from "next/image";

interface TeacherCardProps {
  name: string;
  profilePicture: string;
  rating: number;
  activeStudents: number;
}

function TeacherCard({
  name,
  profilePicture,
  rating,
  activeStudents,
}: TeacherCardProps) {
  return (
    <div className="p-[24px] border border-gray-light mt-[32px] mb-[60px] xxl:mt-[24px] xxl:mb-[32px]">
      <div className="flex flex-col items-center gap-[12px] md:flex-row">
        <div className="flex justify-start">
          <Image
            src={profilePicture}
            width={80}
            height={80}
            alt="Teacher profile picture"
            className="rounded-full w-[80px] h-[80px] object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="w-full text-center mb-[10px] text-[24px] leading-[130%] font-medium md:text-left">
            {name}
          </h3>
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
