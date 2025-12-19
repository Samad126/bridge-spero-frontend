"use client";
import React from "react";
import Requests from "./Requests";
// import Notifications from "./Notifications";
import { useGetTeacherNotificationsQuery } from "@/features/notifications/api/notificationsApi";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

const TeacherNotification = () => {
  // const [chosenCategory, setChosenCategory] = useState("requests");

  // Get teacher ID from profile
  const { data: userData, isLoading: isLoadingProfile } = useGetUserProfileOptionalQuery();

  // Fetch join requests
  const { data: requests = [], isLoading: isLoadingRequests } = useGetTeacherNotificationsQuery(
    userData?.id || 0,
    {
      skip: !userData?.id || userData?.role !== "TEACHER",
    }
  );

  // const handleChangeCategory = (category: string) => {
  //   setChosenCategory(category);
  // };

  const isLoading = isLoadingProfile || isLoadingRequests;

  return (
    <section className="container">
      <div className="text-primary text-center text-[32px] xxl:text-[54px] mb-[60px] xxl:mb-[80px]">
        Notifications
      </div>
      {/* <div className="xxl:hidden flex items-center text-center cursor-pointer mb-[24px]">
        <div
          onClick={() => handleChangeCategory("requests")}
          className={`py-[12px] ${
            chosenCategory === "requests" ? "text-primary border-primary" : "text-secondary border-secondary"
          } border-b flex-1 text-[18px]`}
        >
          Requests {isLoading ? "..." : requests.length}
        </div>
        <div
          onClick={() => handleChangeCategory("notifications")}
          className={`py-[12px] ${
            chosenCategory === "notifications" ? "text-primary border-primary" : "text-secondary border-secondary"
          } border-b flex-1 text-[18px]`}
        >
          Notifications 0
        </div>
      </div> */}
      {isLoading ? (
        <div className="text-center text-secondary py-[40px]">Loading notifications...</div>
      ) : (
        <>
          {/* <div className="xxl:hidden flex items-start gap-[24px]">
            {chosenCategory === "requests" ? (
              <Requests requests={requests} />
            ) : (
              <Notifications />
            )}
          </div> */}
          <div className="flex items-start gap-[24px]">
            <Requests requests={requests} />
            {/* <Notifications /> */}
          </div>
        </>
      )}
    </section>
  );
};

export default TeacherNotification;
