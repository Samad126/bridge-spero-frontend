import Schedule from "../Schedule/components/Schedule";
import Recording from "../Recordings/components/Recording";
import Syllabus from "../Syllabus/components/Syllabus";
import Resources from "../Resources/components/Resources";
import Members from "../Members/components/Index";

interface TabContentProps {
  activeTabId: number;
  groupId: string;
  isGroupOwner: boolean;
}

function TabContent({ activeTabId, groupId, isGroupOwner }: TabContentProps) {
  return (
    <div>
      {activeTabId === 1 && <Schedule groupId={groupId} isGroupOwner={isGroupOwner} />}
      {activeTabId === 2 && <Syllabus groupId={groupId} isGroupOwner={isGroupOwner} />}
      {activeTabId === 3 && <Recording groupId={groupId} isGroupOwner={isGroupOwner} />}
      {activeTabId === 4 && <Resources groupId={groupId} isGroupOwner={isGroupOwner} />}
      {activeTabId === 5 && <Members groupId={groupId} isGroupOwner={isGroupOwner} />}
    </div>
  );
}

export default TabContent;
