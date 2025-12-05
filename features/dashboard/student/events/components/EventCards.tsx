import Image from "next/image";
import Link from "next/link";
import { StudentEventTypes } from "../types/studentEventTypes";

const EventCard = ({id, time, isActive, subjectName, teacherName, joinUrl, status}: StudentEventTypes) => {
    return (
        <div className="w-full h-[270px] p-[24px] border border-gray-light lg:h-[169px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                    <Image width={22} height={22} src={"/clock.svg"} alt="" />
                    <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
                        {time}
                    </span>
                </div>
                <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
                    {isActive ? "active" : status}
                </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-[6px] mt-5 mb-19 lg:mb-0 lg:mt-12">
                    <h3 className="text-[22px] text-primary leading-[100%] tracking-[0%]">
                        {subjectName}
                    </h3>
                    <div>
                        <span className="text-tertiary">{teacherName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-[12px] lg:mt-12 lg:flex-row-reverse">
                    {isActive && joinUrl ? (
                        <a href={joinUrl} target="_blank" rel="noopener noreferrer">
                            <button className="h-[46px] w-[186px] bg-secondary text-white">
                                Join Lesson
                            </button>
                        </a>
                    ) : (
                        <Link href={`/group-details?id=${id}`}>
                            <button className="h-[46px] w-[186px] bg-gray-300 text-gray-600">
                                View Details
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
