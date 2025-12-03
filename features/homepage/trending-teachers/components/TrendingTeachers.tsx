import { Suspense } from "react";
import Link from "next/link";
import TrendingTeachersGrid from "./TrendingTeachersGrid";
import TrendingTeachersSkeleton from "./TrendingTeachersSkeleton";
import ErrorBoundary from "@/features/common/error/components/ErrorBoundary";
import ErrorDisplay from "@/features/common/error/components/ErrorDisplay";

function TrendingTeachers() {
  return (
    <section>
      <div className="container">
        <h2 className="text-[32px] leading-[130%] text-center text-primary lg:text-[48px] xxl:text-[54px]">
          Trending Teachers
        </h2>
        <p className="text-center text-secondary mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] xxl:text-[20px] mx-auto max-w-[350px] lg:max-w-[438px]">
          Meet the teachers everyone&apos;s talking about — our top trending
          mentors right now
        </p>

        <ErrorBoundary fallback={<ErrorDisplay message="Failed to load trending teachers." />}>
          <Suspense fallback={<TrendingTeachersSkeleton />}>
            <TrendingTeachersGrid />
          </Suspense>
        </ErrorBoundary>

        <Link
          href={"/"}
          className="border py-[12px] w-[200px] mx-auto block text-center border-secondary text-secondary"
        >
          More
        </Link>
      </div>
    </section>
  );
}

export default TrendingTeachers;
