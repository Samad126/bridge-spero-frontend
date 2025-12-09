"use client";

import { useState, useMemo } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { tabData } from "../constants/tabData";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

interface TabsProps {
  groupId: string;
  isAuthenticated: boolean;
}

function Tabs({ groupId, isAuthenticated }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(1);
  const isEnrolled = true;

  const { data: userData, isLoading } = useGetUserProfileOptionalQuery(undefined, {
    skip: !isAuthenticated,
  });

  const userRole = userData?.role || "USER";

  const filteredTabs = useMemo(() => {
    // Not logged in: Show only Schedule and Syllabus
    if (!isAuthenticated) {
      return tabData.filter((tab) => tab.id === 1 || tab.id === 2);
    }

    // Teacher: Show all tabs
    if (userRole === "TEACHER") {
      return tabData;
    }

    // Student enrolled: Show all tabs
    if (userRole === "USER" && isEnrolled) {
      return tabData;
    }

    // Student not enrolled: Show only Schedule and Syllabus
    return tabData.filter((tab) => tab.id === 1 || tab.id === 2);
  }, [isAuthenticated, userRole, isEnrolled]);

  if (isLoading && isAuthenticated) {
    return (
      <div className="flex flex-col">
        <div className="border-b border-gray-light animate-pulse">
          <div className="flex gap-[24px] mb-[24px]">
            <div className="h-[24px] w-[100px] bg-gray-light rounded"></div>
            <div className="h-[24px] w-[100px] bg-gray-light rounded"></div>
            <div className="h-[24px] w-[100px] bg-gray-light rounded"></div>
            <div className="h-[24px] w-[100px] bg-gray-light rounded"></div>
            <div className="h-[24px] w-[100px] bg-gray-light rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TabHeader
        tabData={filteredTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabContent activeTabId={activeTabId} groupId={groupId} userRole={userRole} />
    </div>
  );
}

export default Tabs;
