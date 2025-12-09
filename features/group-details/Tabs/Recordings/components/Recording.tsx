"use client";

import RecordingCard from "./RecordingCard";
import { useGetGroupRecordingsQuery } from "@/features/group-details/api/groupDetailsApi";

interface RecordingProps {
  groupId: string;
  userRole?: "TEACHER" | "USER";
}

function Recording({ groupId, userRole }: RecordingProps) {
  const { data: recordings, isLoading, error } = useGetGroupRecordingsQuery(Number(groupId));

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

  // if (error) {
  //   return (
  //     <div className="text-center text-red-500 py-[24px]">
  //       Failed to load recordings. Please try again later.
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      {recordings && recordings.length > 0 && (
        recordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            cardStatus="view"
            recording={recording}
            groupId={Number(groupId)}
            isTeacher={isTeacher}
          />
        ))
      )}
      {isTeacher && (
        <RecordingCard
          cardStatus="add"
          groupId={Number(groupId)}
          isTeacher={isTeacher}
        />
      )}
    </div>
  );
}

export default Recording;
