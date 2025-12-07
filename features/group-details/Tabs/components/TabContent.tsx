import Schedule from "../Schedule/components/Schedule";
import Recording from "../Recordings/components/Recording";
import Syllabus from "../Syllabus/components/Syllabus";
import Resources from "../Resources/components/Resources";
import Members from "../Members/components/Index";

interface TabContentProps {
  activeTabId: number;
  groupId: string;
  userRole?: "TEACHER" | "USER";
}

function TabContent({ activeTabId, groupId, userRole }: TabContentProps) {
  return (
    <div>
      {activeTabId === 1 && <Schedule groupId={groupId} userRole={userRole} />}
      {activeTabId === 2 && <Syllabus groupId={groupId} userRole={userRole} />}
      {activeTabId === 3 && <Recording groupId={groupId} userRole={userRole} />}
      {activeTabId === 4 && <Resources />}
      {activeTabId === 5 && <Members />}
    </div>
  );
}

export default TabContent;
