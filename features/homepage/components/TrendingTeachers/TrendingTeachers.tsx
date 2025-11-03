import Link from "next/link";
import { TeacherCardItem } from "../../homepageTypes";
import TeacherCard from "./TeacherCard";

function TrendingTeachers() {
  const demoTeachers: TeacherCardItem[] = [
    {
      id: 1,
      name: "Kamila Sultanli",
      profileUrl:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      star: 4.9,
      experience: "10+ years",
    },
    {
      id: 2,
      name: "Kamila Sultanli",
      profileUrl:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg",
      star: 4.9,
      experience: "10+ years",
    },
    {
      id: 3,
      name: "Kamila Sultanli",
      profileUrl:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
      star: 4.9,
      experience: "10+ years",
    },
    {
      id: 4,
      name: "Kamila Sultanli",
      profileUrl:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=",
      star: 4.9,
      experience: "10+ years",
    },
  ];

  return (
    <section>
      <div className="container">
        <h3 className="text-[32px] leading-[130%] text-center text-primary lg:text-[48px] xxl:text-[54px]">
          Trending Teachers
        </h3>
        <p className="text-center text-secondary mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] xxl:text-[20px] mx-auto max-w-[350px] lg:max-w-[438px]">
          Meet the teachers everyone&apos;s talking about — our top trending
          mentors right now
        </p>
        <div className="flex flex-col gap-[12px] md:gap-[24px] mb-[32px] lg:mb-[42px] lg:flex-row [&>*:last-child]:hidden xxl:[&>*:last-child]:block">
          {demoTeachers.map((teacher) => (
            <TeacherCard
              experience={teacher.experience}
              name={teacher.name}
              profileUrl={teacher.profileUrl}
              star={teacher.star}
              key={teacher.id}
            />
          ))}
        </div>
        <Link
          href={"/courses"}
          className="border py-[12px] w-[200px] mx-auto block text-center border-secondary text-secondary"
        >
          More
        </Link>
      </div>
    </section>
  );
}

export default TrendingTeachers;
