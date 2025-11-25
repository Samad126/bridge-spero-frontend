import Image from "next/image";

function TeacherCard() {
  return (
    <div className="p-[24px] border border-gray-light mt-[24px]">
      <div className="flex flex-col items-center gap-[12px] md:flex-row">
        <div className="flex justify-start">
          <Image
            src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
            width={80}
            height={80}
            alt="Teacher profile picture"
            className="rounded-full w-[80px] h-[80px] object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="w-full text-center mb-[10px] text-[24px] leading-[130%] font-medium md:text-left">
            Teacher Name
          </h3>
          <div className="flex items-center">
            <Image
              src="/star.svg"
              width={16}
              height={16}
              alt="Teacher rating"
              className="mr-[6px] w-[16px] h-[16px]"
            />
            <span className="text-custom-yellow font-medium">4.9</span>
            <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
            <span className="text-tertiary leading-[130%]">15+ years</span>
            <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
            <div className="flex items-center gap-[8px]">
              <Image
                src="/users-1.svg"
                width={16}
                height={16}
                alt="Number of students"
                className="mr-[6px] w-[16px] h-[16px]"
              />
              <span className="text-tertiary leading-[130%]">300 students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
