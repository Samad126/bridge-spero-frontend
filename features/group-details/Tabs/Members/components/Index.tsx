"use client";

import Image from "next/image";
import MemberList from "./MemberList";
import { useGetGroupMembersQuery } from "@/features/group-details/api/groupDetailsApi";
import { useState, useEffect } from "react";

interface MembersProps {
  groupId: string;
  isGroupOwner: boolean;
}

function Members({ groupId, isGroupOwner }: MembersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const { data: membersData, isLoading, isFetching } = useGetGroupMembersQuery({
    groupId: Number(groupId),
    fullName: debouncedSearchTerm || undefined,
  });

  return (
    <div className="border border-gray-light p-[24px]">
      <div className="flex items-center gap-[12px]">
        <p className="text-secondary">{membersData?.count || 0}</p>
        <Image
          src="/users-dark.svg"
          alt="users"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
      </div>
      <MemberList
        members={membersData?.students || []}
        isLoading={isLoading || isFetching}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        groupId={Number(groupId)}
        isTeacher={isGroupOwner}
      />
    </div>
  );
}

export default Members;
