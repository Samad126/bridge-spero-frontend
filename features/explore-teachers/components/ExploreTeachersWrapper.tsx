import { Suspense } from "react";
import ExploreTeachersGrid from "./ExploreTeachersGrid";
import ExploreTeachersSkeleton from "./ExploreTeachersSkeleton";
import ErrorBoundary from "@/features/common/error/components/ErrorBoundary";
import ErrorDisplay from "@/features/common/error/components/ErrorDisplay";

interface ExploreTeachersWrapperProps {
  searchParams: {
    name?: string;
    pageNumber?: string;
    pageSize?: string;
  };
}

export default function ExploreTeachersWrapper({
  searchParams,
}: ExploreTeachersWrapperProps) {
  const name = searchParams.name || undefined;
  const pageNumber = searchParams.pageNumber
    ? parseInt(searchParams.pageNumber)
    : 0;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 10;

  return (
    <ErrorBoundary
      fallback={<ErrorDisplay message="Failed to load teachers." />}
    >
      <Suspense fallback={<ExploreTeachersSkeleton />}>
        <ExploreTeachersGrid
          name={name}
          pageNumber={pageNumber}
          pageSize={pageSize}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

