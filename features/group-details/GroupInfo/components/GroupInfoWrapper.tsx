"use client";

import { Suspense } from "react";
import GroupInfo from "./GroupInfo";
import GroupInfoSkeleton from "./GroupInfoSkeleton";
import { GroupDetails } from "../../types/groupDetailsTypes";
import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";

interface GroupInfoWrapperProps {
  group: GroupDetails;
  groupId: string;
}

function GroupInfoWrapper({ group, groupId }: GroupInfoWrapperProps) {
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery();

  if (isLoading) {
    return <GroupInfoSkeleton />;
  }

  return (
    <Suspense fallback={<GroupInfoSkeleton />}>
      <GroupInfo group={group} groupId={groupId} user={userData} />
    </Suspense>
  );
}

export default GroupInfoWrapper;

