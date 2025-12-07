"use client";

import MemberItem from "./MemberItem";
import { MemberStudent } from "@/features/group-details/types/groupDetailsTypes";

interface MemberListProps {
  members: MemberStudent[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  groupId: number;
  isTeacher: boolean;
}

function MemberList({
  members,
  isLoading,
  searchTerm,
  onSearchChange,
  groupId,
  isTeacher,
}: MemberListProps) {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mt-[24px] mb-[12px] border border-gray-light h-[46px] px-[12px] w-full outline-0 inline-block placeholder:text-tertiary"
        placeholder="Search members"
      />
      <div className="max-h-[530px] overflow-y-auto border border-gray-light">
        {isLoading ? (
          <div className="p-[24px] text-center">
            <div className="animate-pulse">Loading members...</div>
          </div>
        ) : members.length > 0 ? (
          members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              groupId={groupId}
              isTeacher={isTeacher}
            />
          ))
        ) : (
          <div className="p-[24px] text-center text-secondary">
            No members found
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberList;
