import Schedule from "../Schedule/components/Schedule";
import Recording from "../Recordings/components/Recording";
import Syllabus from "../Syllabus/components/Syllabus";

function TabContent({ activeTabId }: { activeTabId: number }) {
  return (
    <div>
      {activeTabId === 1 && <Schedule />}
      {activeTabId === 2 && <Syllabus />}
      {activeTabId === 3 && <Recording />}
      {activeTabId === 4 && <div>Resources</div>}
    </div>
  );
}

export default TabContent;
