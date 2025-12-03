import TeacherCardSkeleton from "@/features/common/teachers/components/TeacherCardSkeleton";

interface TrendingTeachersSkeletonProps {
  col?: 1 | 2;
  hideLastCard?: boolean;
  count?: number;
}

export default function TrendingTeachersSkeleton({ 
  col = 1, 
  hideLastCard = true,
  count = 4
}: TrendingTeachersSkeletonProps) {
  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:last-child]:hidden xxl:[&>*:last-child]:block"
    : "";

  return (
    <div className={`grid ${gridColsClass} gap-[12px] mb-[32px] lg:grid-cols-3 lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}>
      {Array.from({ length: count }).map((_, index) => (
        <TeacherCardSkeleton key={index} col={col} />
      ))}
    </div>
  );
}

