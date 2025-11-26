function TabContent({ activeTabId }: { activeTabId: number }) {
  return (
    <div className="p-[24px] border border-gray-light">
      {/* {activeTabId === 1 && <Schedule />} */}
      {activeTabId === 1 && <div>Schedule</div>}
      {activeTabId === 2 && <div>Syllabus</div>}
      {activeTabId === 3 && <div>Recordings</div>}
      {activeTabId === 4 && <div>Resources</div>}
    </div>
  );
}

export default TabContent;
