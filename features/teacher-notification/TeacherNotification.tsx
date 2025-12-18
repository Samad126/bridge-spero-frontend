"use client";
import React, { useState } from "react";
import Image from "next/image";
import Requests from "./Requests";
import Notifications from "./Notifications";

const requests = [
  {
    id: 1,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 2,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 3,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 4,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 5,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 6,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
];

const TeacherNotification = () => {
  const [chosenCategory, setChosenCategory] = useState("requests");

  const handleChangeCategory = (category: string) => {
    setChosenCategory(category);
  };

  return (
    <section className="container">
      <div className="text-primary text-center text-[32px] xxl:text-[54px] mb-[60px] xxl:mb-[80px]">
        Notifications
      </div>
      <div className="xxl:hidden flex items-center text-center cursor-pointer mb-[24px]">
        <div
          onClick={() => handleChangeCategory("requests")}
          className={`py-[12px] text-${
            chosenCategory === "requests" ? "primary" : "secondary"
          } border-b border-${
            chosenCategory === "requests" ? "primary" : "secondary"
          } flex-1 text-[18px]`}
        >
          Requests {requests.length}
        </div>
        <div
          onClick={() => handleChangeCategory("notifications")}
          className={`py-[12px] text-${
            chosenCategory === "notifications" ? "primary" : "secondary"
          } border-b border-${
            chosenCategory === "notifications" ? "primary" : "secondary"
          } flex-1 text-[18px]`}
        >
          Notifications 6
        </div>
      </div>
      <div className="xxl:hidden flex items-start gap-[24px]">
        {chosenCategory === "requests" ? (
          <Requests />
        ) : (
          <Notifications />
        )}
      </div>
      <div className="hidden xxl:flex items-start gap-[24px]">
        <Requests />
        <Notifications />
      </div>
    </section>
  );
};

export default TeacherNotification;
