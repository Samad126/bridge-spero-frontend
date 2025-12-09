"use client";

import SyllabusCard from "./SyllabusCard";
import { useGetGroupSyllabusQuery } from "@/features/group-details/api/groupDetailsApi";

interface SyllabusProps {
  groupId: string;
  userRole?: "TEACHER" | "USER";
}

function Syllabus({ groupId, userRole }: SyllabusProps) {
  const { data: syllabusData, isLoading, error } = useGetGroupSyllabusQuery(Number(groupId));

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
          isTeacher={isTeacher}
        />
      ) : (
        isTeacher && (
          <SyllabusCard
            cardStatus="add"
            groupId={Number(groupId)}
            isTeacher={isTeacher}
          />
        )
      )}
    </div>
  );
}

export default Syllabus;
