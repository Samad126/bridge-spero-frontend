import React from "react";
import { GroupCardItem } from "../../homepageTypes";
import GroupCard from "./GroupCard";
import Link from "next/link";

const TrendingGroups = () => {
  const demoGroups: GroupCardItem[] = [
    {
      id: 1,
      imageUrl: "/groupimage.png",
      degree: "Master",
      language: "English",
      subjectName: "Chemistry",
      teacherName: "Kamila Sultanli",
      price: 40,
    },
    {
      id: 2,
      imageUrl: "/groupimage.png",
      degree: "Master",
      language: "English",
      subjectName: "Chemistry",
      teacherName: "Kamila Sultanli",
      price: 40,
    },
    {
      id: 3,
      imageUrl: "/groupimage.png",
      degree: "Master",
      language: "English",
      subjectName: "Chemistry",
      teacherName: "Kamila Sultanli",
      price: 40,
    },
    {
      id: 4,
      imageUrl: "/groupimage.png",
      degree: "Master",
      language: "English",
      subjectName: "Chemistry",
      teacherName: "Kamila Sultanli",
      price: 40,
    },
  ];
  return (
    <section>
      <div className="container">
        <div>
          <h3 className="text-center text-primary text-[32px] leading-[130%] lg:text-[48px] xxl:text-[54px]">
            Trending Groups
          </h3>
          <p className="text-center text-secondary mx-auto max-w-[326px] mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] lg:max-w-[351px] xxl:text-[20px]">
            Learn the skills everyone&apos;s talking about with our trending
            courses
          </p>
        </div>

        <div className="flex flex-col lg:gap-[12px] lg:flex-row [&>*:last-child]:hidden xxl:[&>*:last-child]:block">
          {demoGroups.map((group, i) => (
            <GroupCard
              imageUrl={group.imageUrl}
              degree={group.degree}
              language={group.language}
              subjectName={group.subjectName}
              teacherName={group.teacherName}
              price={group.price}
              key={i}
            />
          ))}
        </div>
        <Link
          href={"/"}
          className="border mt-[15px] py-[12px] w-[200px] mx-auto block text-center border-secondary text-secondary"
        >
          More
        </Link>
      </div>
    </section>
  );
};

export default TrendingGroups;
