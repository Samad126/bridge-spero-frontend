import GroupCardSkeleton from "@/features/common/groups/components/GroupCardSkeleton";

interface ExploreGroupsSkeletonProps {
  count?: number;
}

export default function ExploreGroupsSkeleton({
  count = 10,
}: ExploreGroupsSkeletonProps) {
  return (
    <div className="grid grid-cols-2 mb-[32px] gap-[12px] lg:grid-cols-3 lg:flex-row lg:mb-[42px] xxl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <GroupCardSkeleton key={index} col={2} />
      ))}
    </div>
  );
}

