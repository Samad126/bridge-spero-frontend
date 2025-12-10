"use client";

import { useState, useMemo } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { tabData } from "../constants/tabData";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

interface TabsProps {
  groupId: string;
  isAuthenticated: boolean;
  teacherId: number;
}

function Tabs({ groupId, isAuthenticated, teacherId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(1);
  const isEnrolled = true;

  const { data: userData, isLoading } = useGetUserProfileOptionalQuery(undefined, {
    skip: !isAuthenticated,
  });

  const userRole = userData?.role || "USER";
  const isGroupOwner = userData?.role === "TEACHER" && userData?.id === teacherId;

  const filteredTabs = useMemo(() => {
    // Not logged in: Show only Schedule and Syllabus
    if (!isAuthenticated) {
      return tabData.filter((tab) => tab.id === 1 || tab.id === 2);
    }

    // Teacher who owns this group: Show all tabs
    if (isGroupOwner) {
      return tabData;
    }

    // Enrolled user (student or non-owner teacher): Show all tabs
    if (isEnrolled) {
      return tabData;
    }

    // Not enrolled: Show only Schedule and Syllabus
    return tabData.filter((tab) => tab.id === 1 || tab.id === 2);
  }, [isAuthenticated, isGroupOwner, isEnrolled]);

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
      <TabContent activeTabId={activeTabId} groupId={groupId} isGroupOwner={isGroupOwner} />
    </div>
  );
}

export default Tabs;
