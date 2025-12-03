import GroupCard from "@/features/common/groups/components/GroupCard";
import { fetchExploreGroups } from "../api/fetchExploreGroups";

interface ExploreGroupsGridProps {
  groupName?: string;
  language?: string;
  pageNumber?: number;
  pageSize?: number;
}

export default async function ExploreGroupsGrid({
  groupName,
  language,
  pageNumber = 0,
  pageSize = 10,
}: ExploreGroupsGridProps) {
  const response = await fetchExploreGroups({
    groupName,
    language,
    pageNumber,
    pageSize,
  });

  const groups = response.data;

  if (groups.length === 0) {
    return (
      <div className="text-center py-[60px]">
        <p className="text-secondary text-[18px]">
          No groups found. Try adjusting your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 mb-[32px] gap-[12px] lg:grid-cols-3 lg:flex-row lg:mb-[42px] xxl:grid-cols-4">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          imageUrl={group.imageUrl}
          degree={group.category}
          language={group.language}
          subjectName={group.name}
          teacherName={`${group.teacherName} ${group.teacherSurname}`}
          price={group.price}
          col={2}
        />
      ))}
    </div>
  );
}

