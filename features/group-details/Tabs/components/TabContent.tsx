import Schedule from "../Schedule/components/Schedule";
import Syllabus from "../Syllabus/Syllabus";

function TabContent({ activeTabId }: { activeTabId: number }) {
  return (
    <div>
      {activeTabId === 1 && <Schedule />}
      {activeTabId === 2 && <Syllabus />}
      {activeTabId === 3 && <div>Recordings</div>}
      {activeTabId === 4 && <div>Resources</div>}
    </div>
  );
}

export default TabContent;
