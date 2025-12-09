"use client";

import GroupCard from "@/features/common/groups/components/GroupCard";
import { useGetMyGroupsQuery } from "../api/myGroupsApi";
import { useGetUserProfileQuery } from "@/features/profile/api/userProfileApi";

interface MyGroupsGridProps {
  groupName?: string;
  language?: string;
  status?: string;
  categoryId?: string;
}

export default function MyGroupsGrid({
  groupName,
  language,
  status,
  categoryId,
}: MyGroupsGridProps) {
  const { data: userProfile, isLoading: isLoadingProfile } =
    useGetUserProfileQuery();

  const { data: groupsData, isLoading: isLoadingGroups } = useGetMyGroupsQuery(
    {
      role: userProfile?.role || "USER",
      filters: {
        groupName,
        language,
        status,
        categoryId,
      },
    },
    {
      skip: !userProfile,
    }
  );

  if (isLoadingProfile || isLoadingGroups) {
    return (
      <div className="text-center py-[60px]">
        <p className="text-secondary text-[18px]">Loading groups...</p>
      </div>
    );
  }

  const groups = groupsData || [];

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
          id={group.id}
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
