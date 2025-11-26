import Schedule from "../Schedule/components/Schedule";

function TabContent({ activeTabId }: { activeTabId: number }) {
  return (
    <div>
      {activeTabId === 1 && <Schedule />}
      {activeTabId === 2 && <div>Syllabus</div>}
      {activeTabId === 3 && <div>Recordings</div>}
      {activeTabId === 4 && <div>Resources</div>}
    </div>
  );
}

export default TabContent;
