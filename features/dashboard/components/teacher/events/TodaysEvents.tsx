import Link from "next/link";
import { EventCardTypes } from "../../dashboardTypes";
import EventCard from "./EventCard";

const TodaysEvents = () => {
  const events: EventCardTypes[] = [
    {
      time: "15:00",
      isActive: true,
      subjectName: "Advanced Mathematics",
      studentNumber: "12/15",
    },
    {
      time: "15:00",
      isActive: false,
      subjectName: "Advanced Mathematics",
      studentNumber: "12/15",
    },
    {
      time: "15:00",
      isActive: true,
      subjectName: "Advanced Mathematics",
      studentNumber: "12/15",
    },
    {
      time: "15:00",
      isActive: false,
      subjectName: "Advanced Mathematics",
      studentNumber: "12/15",
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center justify-center xxl:flex-row xxl:justify-between mb-8">
          <h2 className="mb-[32px] text-primary text-[32px] xxl:mb-0">Today&apos;s Events</h2>
          <Link
            href={"/"}
            className="border text-[18px] py-[12px] px-[30px]"
          >
            + Create Group
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-[12px] [&>*:last-child]:hidden xxl:[&>*:last-child]:block xxl:grid-cols-2">
          {events.map((item, index) => (
            <EventCard
              time={item.time}
              isActive={item.isActive}
              subjectName={item.subjectName}
              studentNumber={item.studentNumber}
              key={index}
            />
          ))}
        </div>
        <Link
          href={"/"}
          className="border text-[18px] w-[200px] mx-auto flex justify-center py-[12px] px-[30px] my-8"
        >
          More
        </Link>
      </div>
    </section>
  );
};

export default TodaysEvents;
