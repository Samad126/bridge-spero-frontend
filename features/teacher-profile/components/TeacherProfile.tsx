"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

type RatingStarProps = {
  rate: number;
}

 function RatingStar({ rate }: RatingStarProps) {
    return (
      <div className="flex items-center gap-[24px]">
        {Array.from({length: 5}, (_, i) => {
          const starNumber = i + 1;

          if(rate >= starNumber) {
            return (
              <Image
                  src={"/star.svg"}
                  width={32}
                  height={32}
                  alt={`star`}
                  key={i}
                  className="w-[32px] h-[32px]"
                />
            );
          }

          if (rate >= starNumber - 0.5) {
            return (
              <Image
                  src={"/half-star.svg"}
                  width={32}
                  height={32}
                  key={i}
                  alt={`star`}
                  className="w-[32px] h-[32px] block translate-y-[1px]"
                />
            );
          }

          return (
            <Image
                  src={"/white-star.svg"}
                  key={i}
                  width={32}
                  height={32}
                  alt={`star`}
                  className="w-[32px] h-[32px]"
                />
          );
        })}
      </div>
    );
  }

const TeacherProfile = () => {
  const [isTeacherProfilePic, setIsTeacherProfilePic] = useState("profile");
  const [isZoomConnected, setIsZoomConnected] = useState(false);
  const [isBecomeStudent, setIsBecomeStudent] = useState(true);
  const [isSelected, setIsSelected] = useState("demo");
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeroHovered, setisHeroHovered] = useState(false);
  const [isPpHovered, setIsPpHovered] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [rate, setRate] = useState(2.5);
  const isTeacherLoggedIn = false;
 
  
  const percentage = rate / 5 * 100;


  const itemsPerPage = 8;
  const totalPages = Math.ceil(Groups.length / itemsPerPage);

  const paginatedGroups = Groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectedCategory = (category: string) => {
    setIsSelected(category);
  };

  const openRateModule = () => {
    setShowRateModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeRateModule = () => {
    setShowRateModal(false);
    document.body.style.overflow = "unset";
  };

 const handleOpenDeviceFiles = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();
 }



  return (
    <section className="container flex flex-col gap-[24px] xxl:flex-row">
      <div className="border border-1 border-gray-light flex flex-col xxl:flex-1">
        <div
          onClick={() => handleOpenDeviceFiles()}
          onMouseEnter={() => setisHeroHovered(true)}
          onMouseLeave={() => setisHeroHovered(false)}
          className="cursor-pointer w-full relative overflow-hidden h-[146px] xxl:h-[262px]"
        >
          <Image
            src={"/teacher-profile-hero.jpg"}
            alt="teacher-profile-hero"
            // width={471}
            // height={146}
            fill
            className="object-cover"
          />
          <div
            className={`xxl:${
              isHeroHovered ? "block" : "hidden"
            } absolute inset-0 bg-[#00000099] z-10 block`}
          ></div>
          <Image
            src={"/camera_white.svg"}
            width={22}
            height={22}
            alt=""
            className={`xxl:${
              isHeroHovered ? "block" : "hidden"
            } absolute block inset-0 m-auto cursor-pointer z-20`}
          />
        </div>

        <div className="flex xxl:flex-row flex-col p-[12px] xxl:p-[30px] xxl:gap-[30px] xxl:justify-start xxl:items-start">
          <div className="relative w-fit xxl:w-[314px] mx-auto xxl:mx-0 flex flex-col justify-center items-center xxl:items-start xxl:pl-0 pl-[24px] gap-[24px]">
            <div
              onClick={() => handleOpenDeviceFiles()}
              onMouseEnter={() => setIsPpHovered(true)}
              onMouseLeave={() => setIsPpHovered(false)}
              className="relative cursor-pointer xxl:size-[178px] w-[100px] h-[100px] mt-[-50px] xxl:mt-[-96px] object-cover z-20 mx-auto xxl:mx-0"
            >
              <Image
                src={isTeacherProfilePic ? "/kamila-sultanli.jpg" : "/user.svg"} // Teacher profile varsa bura oturulmelidir.
                alt="teacher"
                width={178}
                height={178}
                className={`relative z-20 w-[100px] h-[100px] xxl:w-[178px] xxl:h-[178px] rounded-full bg-gray-light ${
                  isTeacherProfilePic ? "p-0" : "xxl:p-[38px] p-[21px]"
                }`}
              />
              <div
                className={`xxl:${
                  isPpHovered ? "block" : "hidden"
                } block absolute inset-0 bg-[#00000099] rounded-full z-30`}
              ></div>
              <Image
                src={"/camera_white.svg"}
                width={22}
                height={22}
                alt=""
                className={`xxl:${
                  isPpHovered ? "block" : "hidden"
                } block absolute inset-0 m-auto cursor-pointer z-40`}
              />
            </div>

            <div>
              <h3 className="text-[32px] text-secondary text-center leading-[130%] font-medium xxl:text-left mb-[12px]">
                Kamila Sultanli
              </h3>
              <div className="xxl:w-[200px] w-[185px] xxl:w-max flex items-center mx-auto xxl:mx-0">
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
                  className="mr-[8px] [18px] h-[18px]"
                />
                <span className="text-tertiary">300 students</span>
              </div>
            </div>

            <p className="text-center xxl:text-left w-full">
              Lorem ipsum dolor sit amet consectetur. Est enim morbi vivamus
              viverra maecenas etiam. Nisl fringilla ut sed lacus amet habitant
              urna ipsum nunc. Sit gravida tempus quis laoreet aenean nunc enim
              facilisi bibendum. Maecenas et risus{" "}
            </p>
            {isTeacherLoggedIn ? (
              <div className="flex flex-col gap-[12px] w-[200px]">
                <button className="bg-secondary text-white py-[12px] cursor-pointer">
                  Edit Profile Info
                </button>
                {isBecomeStudent && (
                  <button className="text-secondary border border-secondary py-[12px] cursor-pointer">
                    Switch To Student
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-[12px] w-[200px]">
                <button className="bg-secondary text-white py-[12px] cursor-pointer">
                  Follow
                </button>
                <button
                  onClick={() => openRateModule()}
                  className="text-secondary border border-secondary py-[12px] cursor-pointer"
                >
                  Rate
                </button>
              </div>
            )}
          </div>
          <div className="mt-[24px] xxl:mt-0 w-full">
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
              <div className="relative w-full h-[159px] relative xxl:w-[570px] xxl:h-[278px]">
                <Image
                  src={"/demo-lesson.jpg"}
                  alt="demo-lesson"
                  // width={326}
                  // height={159}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#00000099]"></div>
                <div className="absolute inset-0 flex items-center justify-center gap-[12px]">
                  <Image 
                    src={"/play.svg"}
                    alt="play icon"
                    width={46}
                    height={46}
                    className="border cursor-pointer border-[#EBEBEB] p-[12px]"
                  />
                  <Image 
                    src={"/upload-white.svg"}
                    alt="upload icon"
                    width={46}
                    height={46}
                    color="#EBEBEB"
                    className="border cursor-pointer border-[#EBEBEB] p-[12px]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="grid xxl:grid-cols-4 grid-cols-2 gap-[12px] mb-[24px]">
                  {paginatedGroups.map((group, index) => (
                    <div
                      className="flex border border-gray-light flex-col xxl:gap-[24px] gap-[12px] xxl:pb-[24px] pb-[12px]"
                      key={index}
                    >
                      <Image
                        src={group.profileUrl}
                        alt="course picture"
                        width={200}
                        height={170}
                        className="w-full h-auto"
                      />
                      <div className="xxl:ml-[24px] text-left ml-[12px]">
                        <div className="flex items-center gap-[8px] text-tertiary mb-[6px] xxl:mb-[12px] text-[12px] xxl:text-[14px]">
                          <div>{group.category}</div>
                          <div className="w-px h-[10px] bg-tertiary"></div>
                          <div className="flex items-center gap-[4px]">
                            <Image
                              src={"/globe.svg"}
                              alt=""
                              width={12}
                              height={12}
                              className="xxl:size-[16px]"
                            />
                            <div>{group.language}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-secondary text-[20px] xxl:text-[24px] mb-[4px]">
                            {group.subject}
                          </div>
                          <div className="text-tertiary text-[12px] xxl:text-[14px]">
                            {group.teacher}
                          </div>
                        </div>
                      </div>
                      <div className="xxl:mx-[24px] mx-[12px] flex items-center xxl:gap-[24px] gap-[12px] justify-between">
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
              <div className="flex flex-col items-center py-[24px] px-[12px] xxl:p-[30px]">
                <h3 className="text-primary mb-[12px] xxl:mb-[16px] text-center xxl:text-[32px] text-[24px]">
                  Link Zoom to start your live lessons
                </h3>
                <p className="text-center text-secondary mb-[24px] xxl:mb-[42px]">
                  Link your account and start teaching live in just a few clicks
                </p>
                <button className="bg-secondary text-white py-[12px] w-[200px] cursor-pointer text-[18px]">
                  Connect to Zoom
                </button>
              </div>
            </div>
          )}

          {!isBecomeStudent && (
            <div className="border border-1 border-gray-light p-[12px]">
              <div className="flex flex-col items-center py-[24px] px-[12px] xxl:p-[30px]">
                <h3 className="text-primary mb-[12px] xxl:mb-[16px] text-center xxl:text-[32px] text-[24px]">
                  Learning isn’t just for students — join the fun
                </h3>
                <p className="text-center text-secondary mb-[24px] xxl:mb-[42px]">
                  Keep growing, stay curious, and bring that energy back to your
                  teaching
                </p>
                <button className="bg-secondary text-white py-[12px] w-[200px] cursor-pointer text-[18px]">
                  Become a Student
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {showRateModal && (
        <div>
          <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 w-[304px] p-[24px] flex flex-col gap-[32px] m-auto z-90 h-max bg-white text-secondary">
            <div className="w-full flex flex-col items-center">
              <span className="text-custom-yellow text-center font-medium text-[32px] mb-[12px]">
                {rate}
              </span>
              <RatingStar rate = { rate } />
            </div>
            <div>
              <input
                id="volume"
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-primary appearance-none h-[2px] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 "
                style={{
                  background: `linear-gradient(
            to right,
            #C96129 ${percentage}%,
            #C8C8C8 ${percentage}%
          )`,
                }}
              />
            </div>
            <button onClick={() => closeRateModule()} className="bg-secondary mx-[28px] text-white py-[12px] text-[18px] cursor-pointer">
              Submit
            </button>
          </div>
          <div onClick={() => closeRateModule()} className="w-full h-full fixed inset-0 bg-[#00000099] z-80"></div>
        </div>
      )}
    </section>
  );
};

export default TeacherProfile;
