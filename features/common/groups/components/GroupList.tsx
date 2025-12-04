import { GroupCardItem } from "../types/groupListTypes";
import GroupCard from "./GroupCard";

interface GroupListProps {
  demoGroups: GroupCardItem[];
  col?: 1 | 2;
  hideLastCard?: boolean;
}

function GroupList({ demoGroups, col = 1, hideLastCard = true }: GroupListProps) {
  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block"
    : "";

  return (
    <div className={`grid ${gridColsClass} mb-[32px] gap-[12px] lg:grid-cols-3 lg:flex-row lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}>
      {demoGroups.map((group, i) => (
        <GroupCard
          imageUrl={group.imageUrl}
          degree={group.degree}
          language={group.language}
          subjectName={group.subjectName}
          teacherName={group.teacherName}
          price={group.price}
          col={col}
          key={i}
        />
      ))}
    </div>
  );
}

export default GroupList;
