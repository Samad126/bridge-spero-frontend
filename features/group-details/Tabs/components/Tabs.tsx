"use client";

import { useState } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { tabData } from "../constants/tabData";

function Tabs() {
  const [activeTabId, setActiveTabId] = useState(1);

  return (
    <div className="flex flex-col">
      <TabHeader
        tabData={tabData}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabContent activeTabId={activeTabId} />
    </div>
  );
}

export default Tabs;
