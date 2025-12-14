import { Suspense } from "react";
import ExploreGroupsGrid from "./ExploreGroupsGrid";
import ExploreGroupsSkeleton from "./ExploreGroupsSkeleton";
import ErrorBoundary from "@/features/common/error/components/ErrorBoundary";
import ErrorDisplay from "@/features/common/error/components/ErrorDisplay";

interface ExploreGroupsWrapperProps {
  searchParams: {
    groupName?: string;
    language?: string;
    pageNumber?: string;
    pageSize?: string;
  };
}

export default function ExploreGroupsWrapper({
  searchParams,
}: ExploreGroupsWrapperProps) {
  const name = searchParams.groupName || undefined;
  const language = searchParams.language || undefined;
  const pageNumber = searchParams.pageNumber
    ? parseInt(searchParams.pageNumber)
    : 0;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 12;

  return (
    <ErrorBoundary
      fallback={<ErrorDisplay message="Failed to load groups." />}
    >
      <Suspense fallback={<ExploreGroupsSkeleton />}>
        <ExploreGroupsGrid
          groupName={name}
          language={language}
          pageNumber={pageNumber}
          pageSize={pageSize}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

