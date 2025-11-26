function TabHeader({
  tabData,
  activeTabId,
  setActiveTabId,
}: {
  tabData: { id: number; label: string }[];
  activeTabId: number;
  setActiveTabId: (id: number) => void;
}) {
  return (
    <div className="mb-[24px] flex items-center overflow-auto">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          className={`py-[12px] flex-1 min-w-[180px] text-[18px] bg-white border border-gray-light ${
            tab.id === activeTabId ? "text-white bg-secondary!" : ""
          }`}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabHeader;
