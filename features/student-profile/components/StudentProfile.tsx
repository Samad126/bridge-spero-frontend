"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Teachers = [
  {
    id: 1,
    name: "Kamila Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 4.9,
  },
  {
    id: 2,
    name: "Kamila Sultansiz",
    profileUrl: "/kamila-sultanli.jpg",
    star: 1.9,
  },
  {
    id: 3,
    name: "Kama Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 2.9,
  },
  {
    id: 4,
    name: "Kamush Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 3.9,
  },
  {
    id: 5,
    name: "Kamila Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 4.9,
  },
  {
    id: 6,
    name: "Kamila Sultansiz",
    profileUrl: "/kamila-sultanli.jpg",
    star: 1.9,
  },
  {
    id: 7,
    name: "Kama Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 2.9,
  },
  {
    id: 8,
    name: "Kamush Sultanli",
    profileUrl: "/kamila-sultanli.jpg",
    star: 3.9,
  },
];

const StudentProfile = () => {
  const [isStudentProfilePic, setIsStudentProfilePic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSelected, setIsSelected] = useState("teachers");
  const [ currentPage, setCurrentPage ] = useState(1);
  const isStudent = true;

  const handleSelectedCategory = (category: string) => {
    setIsSelected(category);
  };

  useEffect(() => {
    // handleSelectedCategory('teachers');
  }, [isSelected]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(Teachers.length / itemsPerPage);
  const paginatedTeachers = Teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage* itemsPerPage
  );

  return (
    <section className="container">
      <div className="border border-1 border-gray-light">
        <div className="w-full xxl:h-[262px] h-[146px] xxl:static relative">
          <img
            src={"/teacher-profile-hero.jpg"}
            className="size-full object-cover overflow-hidden"
            alt=""
          />
          <div className="xxl:hidden absolute inset-0 bg-[#00000099] z-10"></div>
          <Image
            src={"/camera_white.svg"}
            width={22}
            height={22}
            alt=""
            className="xxl:hidden absolute inset-0 m-auto cursor-pointer z-100"
          />
        </div>
        <div className="xxl:flex xxl:p-[30px]">
          <div className="mb-[24px] xxl:w-[314px] mt-[-34px] xxl:mt-[-99px] flex flex-col justify-center items-center xxl:justify-start xxl:items-start gap-[24px] mx-[18px] xxl:mx-0">
            <div className="relative">
              <Image
                src={isStudentProfilePic ? "/kamila-sultanli.jpg" : "/user.svg"} // student profile varsa bura oturulmelidir.
                alt="student"
                width={178}
                height={178}
                className={`relative z-20 w-[100px] h-[100px] xxl:w-[178px] xxl:h-[178px] rounded-full bg-gray-light ${
                  isStudentProfilePic ? "p-0" : "xxl:p-[38px] p-[21px]"
                }`}
              />
              <div className="xxl:hidden absolute inset-0 bg-[#00000099] rounded-full z-30"></div>
              <Image
                src={"/camera_white.svg"}
                width={22}
                height={22}
                alt=""
                className="xxl:hidden absolute inset-0 m-auto cursor-pointer z-100"
              />
            </div>
            <div>
              <h3 className="text-[32px] text-secondary leading-[130%] font-medium">
                Ilham Qadalov
              </h3>
            </div>

            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur. Est enim morbi vivamus
              viverra maecenas etiam. Nisl fringilla ut sed lacus amet habitant
              urna ipsum nunc. Sit gravida tempus quis laoreet aenean nunc enim
              facilisi bibendum. Maecenas et risus{" "}
            </p>
            {isStudent ? (
              <button className="bg-secondary text-white py-[12px] px-[42px] cursor-pointer">
                Edit Profile Info
              </button>
            ) : null}
          </div>

          <div className="xxl:flex-1 flex flex-col gap-[24px] items-center px-[12px] pb-[12px] xxl:p-0">
            <div className="flex items-center w-full select-none">
              <div
                onClick={() => handleSelectedCategory("groups")}
                className={`${
                  isSelected !== "groups" ? "text-secondary" : "text-primary"
                } text-center border-b-1 py-[12px] flex-1 cursor-pointer`}
              >
                Groups 10
              </div>
              <div
                onClick={() => handleSelectedCategory("teachers")}
                className={`${
                  isSelected !== "teachers" ? "text-secondary" : "text-primary"
                } text-center border-b-1 py-[12px] flex-1 cursor-pointer`}
              >
                Teachers {Teachers.length}
              </div>
            </div>

            <div className="grid w-full grid-cols-2 xxl:grid-cols-3 gap-[12px]">
              {paginatedTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="border border-1 border-gray-light p-[24px]"
                >
                  <div className="xxl:mb-[24px] mb-[12px] xxl:flex-row flex flex-col gap-[12px] items-center">
                    <div>
                      <Image
                        width={80}
                        height={80}
                        className="rounded-full"
                        src={teacher.profileUrl}
                        alt="The photo of the teacher"
                      />
                    </div>
                    <div>
                      <div className="xxl:text-[24px] text-[18px] text-secondary leading-[130%] font-medium break-all">
                        {teacher.name}
                      </div>
                      <div className="flex gap-[6px] items-center">
                        <Image
                          src={"/star.svg"}
                          width={16}
                          height={16}
                          alt={`star`}
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-custom-yellow font-medium">
                          4.9
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="cursor-pointer bg-secondary text-white py-[12px] w-full">
                    View Profile
                  </button>
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
                )
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
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
