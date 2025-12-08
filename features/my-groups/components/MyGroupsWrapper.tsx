"use client";

import { Suspense } from "react";
import MyGroupsGrid from "./MyGroupsGrid";
import ExploreGroupsSkeleton from "@/features/explore-groups/components/ExploreGroupsSkeleton";
import ErrorBoundary from "@/features/common/error/components/ErrorBoundary";
import ErrorDisplay from "@/features/common/error/components/ErrorDisplay";

interface MyGroupsWrapperProps {
  searchParams: {
    groupName?: string;
    language?: string;
    status?: string;
    categoryId?: string;
  };
}

export default function MyGroupsWrapper({
  searchParams,
}: MyGroupsWrapperProps) {
  const groupName = searchParams.groupName || undefined;
  const language = searchParams.language || undefined;
  const status = searchParams.status || undefined;
  const categoryId = searchParams.categoryId || undefined;

  return (
    <ErrorBoundary
      fallback={<ErrorDisplay message="Failed to load groups." />}
    >
      <Suspense fallback={<ExploreGroupsSkeleton />}>
        <MyGroupsGrid
          groupName={groupName}
          language={language}
          status={status}
          categoryId={categoryId}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
