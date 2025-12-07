import TeacherCardSkeleton from "@/features/common/teachers/components/TeacherCardSkeleton";

interface ExploreTeachersSkeletonProps {
  count?: number;
}

export default function ExploreTeachersSkeleton({
  count = 10,
}: ExploreTeachersSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-[12px] mb-[32px] lg:grid-cols-3 lg:mb-[42px] xxl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <TeacherCardSkeleton key={index} col={2} />
      ))}
    </div>
  );
}

