"use client";

import ResourcesCard from "./ResourcesCard";
import { useGetGroupResourcesQuery } from "@/features/group-details/api/groupDetailsApi";

interface ResourcesProps {
  groupId: string;
  userRole?: "TEACHER" | "USER";
}

function Resources({ groupId, userRole }: ResourcesProps) {
  const { data: resources, isLoading, error } = useGetGroupResourcesQuery(Number(groupId));

  const isTeacher = userRole === "TEACHER";

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
            isTeacher={isTeacher}
          />
        ))
      )}
      {isTeacher && (
        <ResourcesCard
          cardStatus="add"
          groupId={Number(groupId)}
          isTeacher={isTeacher}
        />
      )}
    </div>
  );
}

export default Resources;