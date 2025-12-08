"use client";
import Image from "next/image";
import React, { useState } from "react";

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
    const [ isStudentProfilePic, setIsStudentProfilePic ] = useState(null);
    const pagination = 6;

  return (
    <section className="container">
      <div className="border border-1 border-gray-light">
        <div className="xxl:w-full xxl:h-[262px]">
          <Image
            src={"/teacher-profile-hero.jpg"}
            width={0}
            height={0}
            sizes="100vw"
            className="xxl:w-full xxl:max-h-full object-cover"
            alt="student-profile-hero"
          />
        </div>
        <div className="xxl:flex xxl:p-[30px]">
          <div className="xxl:w-[314px] xxl:mt-[-99px]  xxl:flex xxl:flex-col xxl:justify-start xxl:items-start xxl:gap-[24px]">
            <Image
              src={isStudentProfilePic ? "/kamila-sultanli.jpg" : "/user.svg"} // student profile varsa bura oturulmelidir.
              alt="student"
              width={178}
              height={178}
              className={`xxl:rounded-full xxl:bg-gray-light ${isStudentProfilePic ? "xxl:p-0" : "p-[38px]"}`}
            />
            <div>
              <h3 className="text-[32px] text-secondary leading-[130%] font-medium">
                Kamila Sultanli
              </h3>
            </div>

            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur. Est enim morbi vivamus
              viverra maecenas etiam. Nisl fringilla ut sed lacus amet habitant
              urna ipsum nunc. Sit gravida tempus quis laoreet aenean nunc enim
              facilisi bibendum. Maecenas et risus{" "}
            </p>
            <button className="bg-secondary text-white py-[12px] xxl:px-[42px] cursor-pointer">
              Edit Profile Info
            </button>
          </div>
          <div className="xxl:flex-1 xxl:flex xxl:flex-col xxl:gap-[24px] xxl:items-center">
            <div className="xxl:flex xxl:items-center xxl:w-full">
              <div className="xxl:text-secondary xxl:text-center xxl:border-b-1 border-[#252525] py-[12px] xxl:flex-1 xxl:cursor-pointer">
                Groups 10
              </div>
              <div className="xxl:text-primary xxl:text-center xxl:border-b-1 border-[primary] py-[12px] xxl:flex-1 xxl:cursor-pointer">
                Teachers {Teachers.length}
              </div>
            </div>

            <div className="xxl:grid xxl:grid-cols-3 xxl:gap-[12px]">
              {Teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="border border-1 border-gray-light xxl:p-[24px]"
                >
                  <div className="xxl:mb-[24px] xxl:flex xxl:gap-[12px] xxl:items-center">
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
                      <div className="xxl:text-[24px] text-secondary leading-[130%] font-medium">
                        {teacher.name}
                      </div>
                      <div className="xxl:flex xxl:gap-[6px] xxl:items-center">
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
                  <button className="cursor-pointer bg-secondary text-white py-[12px] xxl:w-full">
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            <div>pagination</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
