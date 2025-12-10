"use client";

import SyllabusCard from "./SyllabusCard";
import { useGetGroupSyllabusQuery } from "@/features/group-details/api/groupDetailsApi";

interface SyllabusProps {
  groupId: string;
  isGroupOwner: boolean;
}

function Syllabus({ groupId, isGroupOwner }: SyllabusProps) {
  const { data: syllabusData, isLoading, error } = useGetGroupSyllabusQuery(Number(groupId));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
        <div className="border border-gray-light p-[24px] animate-pulse">
          <div className="h-[32px] bg-gray-light rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  // if (error && error.status !== 404) {
  //   return (
  //     <div className="text-center text-red-500 py-[24px]">
  //       Failed to load syllabus. Please try again later.
  //     </div>
  //   );
  // }

  const hasSyllabus = syllabusData;

  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      {hasSyllabus ? (
        <SyllabusCard
          cardStatus="view"
          syllabusPath={syllabusData}
          groupId={Number(groupId)}
          isTeacher={isGroupOwner}
        />
      ) : (
        isGroupOwner && (
          <SyllabusCard
            cardStatus="add"
            groupId={Number(groupId)}
            isTeacher={isGroupOwner}
          />
        )
      )}
    </div>
  );
}

export default Syllabus;
