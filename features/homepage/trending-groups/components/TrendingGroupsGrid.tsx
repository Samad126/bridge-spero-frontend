import GroupCard from "@/features/common/groups/components/GroupCard";
import { fetchTrendingGroups } from "../api/fetchTrendingGroups";

interface TrendingGroupsGridProps {
  col?: 1 | 2;
  hideLastCard?: boolean;
}

export default async function TrendingGroupsGrid({ 
  col = 1, 
  hideLastCard = true 
}: TrendingGroupsGridProps) {
  const response = await fetchTrendingGroups(0, 4);
  const groups = response.data;

  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block"
    : "";

  return (
    <div className={`grid ${gridColsClass} mb-[32px] gap-[12px] lg:grid-cols-3 lg:flex-row lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          id={group.id}
          imageUrl={group.imageUrl}
          degree={group.category}
          language={group.language}
          subjectName={group.name}
          teacherName={`${group.teacherName} ${group.teacherSurname}`}
          price={group.price}
          col={col}
        />
      ))}
    </div>
  );
}

