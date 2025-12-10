"use client";

import ResourcesCard from "./ResourcesCard";
import { useGetGroupResourcesQuery } from "@/features/group-details/api/groupDetailsApi";

interface ResourcesProps {
  groupId: string;
  isGroupOwner: boolean;
}

function Resources({ groupId, isGroupOwner }: ResourcesProps) {
  const { data: resources, isLoading, error } = useGetGroupResourcesQuery(Number(groupId));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
        <div className="border border-gray-light p-[24px] animate-pulse">
          <div className="h-[32px] bg-gray-light rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      {resources && resources.length > 0 && (
        resources.map((resource) => (
          <ResourcesCard
            key={resource.id}
            cardStatus="view"
            resource={resource}
            groupId={Number(groupId)}
            isTeacher={isGroupOwner}
          />
        ))
      )}
      {isGroupOwner && (
        <ResourcesCard
          cardStatus="add"
          groupId={Number(groupId)}
          isTeacher={isGroupOwner}
        />
      )}
    </div>
  );
}

export default Resources;