"use client";

import { useGetTeacherDashboardQuery } from "../../api/teacherDashboardApi";
import WelcomeBackSkeleton from "./WelcomeBackSkeleton";

const WelcomeBack = () => {
  const { data, isLoading, error } = useGetTeacherDashboardQuery();

  if (isLoading) {
    return <WelcomeBackSkeleton />;
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-red-500 text-[20px]">Failed to load dashboard data</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h2 className="text-center text-primary text-[34px] leading-[130%] font-normal tracking-[0%] xxl:text-[54px]">
          Welcome back, {data?.name || "Teacher"}!
        </h2>
        <div className="border border-gray-light max-w-[350px] mt-10 mx-auto lg:max-w-[1440px] lg:flex lg:border-none xxl:max-w-[1440px] lg:justify-center lg:space-x-[48px] lg:items-center xxl:lg:space-x-[64px]">
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse lg:py-0 lg:px-0!">
            <span className="leading-[100%] text-secondary text-[20px] xxl:text-[24px]">
              Active Groups
            </span>
            <span className="text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xxl:text-[32px]">
              {data?.activeGroups || 0}
            </span>
          </div>{" "}
          <hr className="border-gray-light lg:hidden" />
          <div className="hidden w-px border-l border-secondary h-[48px] bg-red-500 lg:block"></div>
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse xxl:pl-[20px] lg:py-0 lg:px-0!">
            <span className="leading-[100%] text-secondary text-[20px] xxl:text-[24px]">
              Total Students
            </span>
            <span className="text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xxl:text-[32px]">
              {data?.activeStudents || 0}
            </span>
          </div>
          <hr className="border-gray-light lg:hidden" />
          <div className="hidden w-px border-l border-secondary h-[48px] bg-red-500 lg:block"></div>
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse lg:py-0 lg:px-0!">
            <span className="leading-[100%] text-secondary text-[20px] xxl:text-[24px]">
              Total Earnings
            </span>
            <span className="text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xxl:text-[32px]">
              ${data?.totalEarning?.toFixed(2) || "0.00"}
            </span>
          </div>{" "}
          <hr className="border-gray-light lg:hidden" />
          <div className="hidden w-px border-l border-secondary h-[48px] bg-red-500 lg:block"></div>
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse xxl:pl-[20px] lg:py-0 lg:px-0!">
            <span className="leading-[100%] text-secondary text-[20px] xxl:text-[24px]">
              Average Rating
            </span>
            <span className="text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xxl:text-[32px]">
              {data?.rating?.toFixed(1) || "0.0"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBack;
