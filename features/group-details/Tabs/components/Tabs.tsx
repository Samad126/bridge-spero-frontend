"use client";

import { useState, useMemo } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { tabData } from "../constants/tabData";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

interface TabsProps {
  groupId: string;
}

function Tabs({ groupId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(1);
  const { data: userData } = useGetUserProfileOptionalQuery();

  const filteredTabs = useMemo(() => {
    if (!userData) {
      return tabData.filter((tab) => tab.id === 1 || tab.id === 2);
    }
    return tabData;
  }, [userData]);

  return (
    <div className="flex flex-col">
      <TabHeader
        tabData={filteredTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabContent activeTabId={activeTabId} groupId={groupId} userRole={userData?.role} />
    </div>
  );
}

export default Tabs;
