"use client";
import Image from "next/image";
import React, { useState } from "react";

const Groups = [
  {
    category: "Math",
    language: "English",
    subject: "Chemistry",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 40,
  },
  {
    category: "Physics",
    language: "English",
    subject: "Physics",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 45,
  },
  {
    category: "Biology",
    language: "Russian",
    subject: "Biology",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 35,
  },
  {
    category: "IT",
    language: "English",
    subject: "JavaScript",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 60,
  },
  {
    category: "Language",
    language: "English",
    subject: "IELTS",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 50,
  },
  {
    category: "Math",
    language: "Azerbaijani",
    subject: "Algebra",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 30,
  },
  {
    category: "Chemistry",
    language: "English",
    subject: "Organic Chemistry",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 55,
  },
  {
    category: "IT",
    language: "English",
    subject: "React",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 65,
  },
  {
    category: "Language",
    language: "Russian",
    subject: "TOEFL",
    teacher: "Kamila Sultanli",
    profileUrl: "/course-picture.png",
    price: 45,
  },
];

const TeacherProfile = () => {
  const [isZoomConnected, setIsZoomConnected] = useState(false);
  const [isBecomeStudent, setIsBecomeStudent] = useState(false);
  const [isSelected, setIsSelected] = useState("demo");
  const [currentPage, setCurrentPage] = useState(1);
  const isTeacherLoggedIn = false;

  const itemsPerPage = 8;
  const totalPages = Math.ceil(Groups.length / itemsPerPage);

  const paginatedGroups = Groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectedCategory = (category: string) => {
    setIsSelected(category);
  };

  return (
    <section className="container flex flex-col gap-[24px] xxl:gap-[24px] xxl:flex-row">
      <div className="border border-1 border-gray-light flex flex-col xxl:flex-1">
        <div className="w-full relative overflow-hidden h-[146px] lg:h-[262px]">
          <Image
            src={"/teacher-profile-hero.jpg"}
            alt="teacher-profile-hero"
            // width={471}
            // height={146}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex xxl:flex-row flex-col p-[12px] xxl:p-[30px] xxl:gap-[30px] xxl:justify-start xxl:items-start">
          <div className="xxl:w-[314px] flex flex-col justify-center items-center xxl:items-start xxl:pl-0 pl-[24px] gap-[24px]">
            <Image
              src={"/kamila-sultanli.jpg"}
              alt="teacher"
              width={100}
              height={100}
              className="xxl:size-[178px] rounded-full mt-[-50px] xxl:mt-[-96px] z-10 mx-auto xxl:mx-0"
            />
            <div>
              <h3 className="text-[32px] text-secondary text-center leading-[130%] font-medium xxl:text-left xxl:mb-[12px]">
                Kamila Sultanli
              </h3>
              <div className="w-[200px] xxl:w-max flex items-center mx-auto xxl:mx-0">
                <Image
                  src={"/star.svg"}
                  width={16}
                  height={16}
                  alt={`star`}
                  className="mr-[6px] w-[16px] h-[16px]"
                />
                <span className="text-custom-yellow">4.9</span>
                <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
                <Image
                  src={"/users-1.svg"}
                  width={16}
                  height={16}
                  alt={`star`}
                  className="mr-[6px] xxl:mr-[8px] xxl:w-[18px] xxl:h-[18px] w-[16px] h-[16px]"
                />
                <span className="text-tertiary">300 students</span>
              </div>
            </div>

            <p className="text-center xxl:text-left">
              Lorem ipsum dolor sit amet consectetur. Est enim morbi vivamus
              viverra maecenas etiam. Nisl fringilla ut sed lacus amet habitant
              urna ipsum nunc. Sit gravida tempus quis laoreet aenean nunc enim
              facilisi bibendum. Maecenas et risus{" "}
            </p>
            {isTeacherLoggedIn ? (
              <button className="bg-secondary text-white py-[12px] px-[30px] cursor-pointer">
                Edit Profile Info
              </button>
            ) : (
              <div className="flex flex-col xxl:gap-[12px] w-[200px]">
                <button className="bg-secondary text-white py-[12px] px-[30px] cursor-pointer">
                  Follow
                </button>
                <button className="text-secondary border border-secondary py-[12px] px-[30px] cursor-pointer">
                  Rate
                </button>
              </div>
            )}
          </div>
          <div className="mt-5 w-full">
            <div className="flex items-center w-full select-none mb-[24px]">
              <div
                onClick={() => handleSelectedCategory("demo")}
                className={`${
                  isSelected !== "demo" ? "text-secondary" : "text-primary"
                } text-center border-b-1 py-[12px] flex-1 cursor-pointer`}
              >
                Demo Lesson
              </div>
              {!isTeacherLoggedIn && (
                <div
                  onClick={() => handleSelectedCategory("groups")}
                  className={`${
                    isSelected !== "groups" ? "text-secondary" : "text-primary"
                  } text-center border-b-1 py-[12px] flex-1 cursor-pointer`}
                >
                  Groups {Groups.length}
                </div>
              )}
            </div>
            {isSelected === "demo" ? (
              <div className="w-[326px] h-[159px] relative lg:w-[570px] lg:h-[278px]">
                <Image
                  src={"/demo-lesson.jpg"}
                  alt="demo-lesson"
                  // width={326}
                  // height={159}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div>
                <div className="grid xxl:grid-cols-4 gap-[12px] mb-[24px]">
                  {paginatedGroups.map((group, index) => (
                    <div
                      className="xxl:flex border border-gray-light xxl:flex-col xxl:gap-[24px] pb-[24px]"
                      key={index}
                    >
                      <Image
                        src={group.profileUrl}
                        alt="course picture"
                        width={200}
                        height={170}
                        className="w-full h-auto"
                      />
                      <div className="xxl:ml-[24px] text-left">
                        <div className="flex items-center gap-[8px] text-tertiary mb-[12px] text-[14px]">
                          <div>{group.category}</div>
                          <div className="w-px h-[10px] bg-tertiary"></div>
                          <div className="flex items-center gap-[4px]">
                            <Image
                              src={"/globe.svg"}
                              alt=""
                              width={16}
                              height={16}
                            />
                            <div>{group.language}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-secondary text-[24px] mb-[4px]">
                            {group.subject}
                          </div>
                          <div className="text-tertiary text-[14px]">
                            {group.teacher}
                          </div>
                        </div>
                      </div>
                      <div className="mx-[24px] flex items-center gap-[24px] justify-between">
                        <div className="text-secondary text-[20px] font-semibold">
                          40$
                        </div>
                        <button className="cursor-pointer bg-secondary text-[#EBEBEB] py-[12px] w-full text-[18px]">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                                      w-[40px] h-[40px] font-medium border-gray-light text flex items-center justify-center cursor-pointer
                                      ${
                                        currentPage === page
                                          ? "bg-secondary text-white"
                                          : "text-secondary"
                                      }
                                    `}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="w-[40px] h-[40px] border border-gray-light flex items-center justify-center cursor-pointer disabled:opacity-40"
                  >
                    <Image
                      src="/arrow-right.svg"
                      width={22}
                      height={22}
                      alt="right-arrow"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isTeacherLoggedIn && (
        <div className="flex flex-col gap-[24px]">
          {!isZoomConnected && (
            <div className="border border-1 border-gray-light p-[12px]">
              <div className="flex flex-col gap-[24px] items-center p-[12px]">
                <h3 className="text-primary text-center text-[24px]">
                  Link Zoom to start your live lessons
                </h3>
                <p className="text-center text-secondary">
                  Link your account and start teaching live in just a few clicks
                </p>
                <button className="bg-secondary text-white py-[12px] px-[30px] cursor-pointer">
                  Connect to Zoom
                </button>
              </div>
            </div>
          )}

          {!isBecomeStudent && (
            <div className="border border-1 border-gray-light p-[12px]">
              <div className="flex flex-col gap-[24px] items-center p-[12px]">
                <h3 className="text-primary text-center text-[24px]">
                  Learning isn’t just for students — join the fun
                </h3>
                <p className="text-center text-secondary">
                  Keep growing, stay curious, and bring that energy back to your
                  teaching
                </p>
                <button className="bg-secondary text-white py-[12px] px-[30px] ">
                  Become a Student
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TeacherProfile;
