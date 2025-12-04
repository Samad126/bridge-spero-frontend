import GroupCardSkeleton from "@/features/common/groups/components/GroupCardSkeleton";

interface TrendingGroupsSkeletonProps {
  col?: 1 | 2;
  hideLastCard?: boolean;
  count?: number;
}

export default function TrendingGroupsSkeleton({
  col = 1,
  hideLastCard = true,
  count = 4,
}: TrendingGroupsSkeletonProps) {
  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block"
    : "";

  return (
    <div
      className={`grid ${gridColsClass} mb-[32px] gap-[12px] lg:grid-cols-3 lg:flex-row lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <GroupCardSkeleton key={index} col={col} />
      ))}
    </div>
  );
}
