import Schedule from "../Schedule/components/Schedule";
import Recording from "../Recordings/components/Recording";
import Syllabus from "../Syllabus/components/Syllabus";
import Resources from "../Resources/components/Resources";
import Members from "../Members/components/Index";

function TabContent({ activeTabId }: { activeTabId: number }) {
  return (
    <div>
      {activeTabId === 1 && <Schedule />}
      {activeTabId === 2 && <Syllabus />}
      {activeTabId === 3 && <Recording />}
      {activeTabId === 4 && <Resources />}
      {activeTabId === 5 && <Members />}
    </div>
  );
}

export default TabContent;
