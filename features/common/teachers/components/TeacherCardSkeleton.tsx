interface TeacherCardSkeletonProps {
  col?: 1 | 2;
}

function TeacherCardSkeleton({ col = 1 }: TeacherCardSkeletonProps) {
  const containerLayout = col === 2 ? "flex-col md:flex-row" : "flex-row";
  const imageContainerClass = col === 2
    ? "flex justify-center md:justify-start"
    : "flex justify-start";
  const contentContainerClass = col === 2
    ? "flex flex-col items-center md:items-start"
    : "flex flex-col items-start";

  return (
    <div className="p-[24px] flex-1 border border-gray-light animate-pulse">
      <div className={`flex ${containerLayout} items-center gap-[12px] mb-[24px]`}>
        {/* Profile image skeleton */}
        <div className={imageContainerClass}>
          <div className="rounded-full w-[80px] h-[80px] bg-gray-light"></div>
        </div>

        {/* Content skeleton */}
        <div className={contentContainerClass}>
          <div className="h-[24px] w-[150px] bg-gray-light rounded mb-[10px]"></div>
          <div className="flex items-center">
            <div className="w-[16px] h-[16px] bg-gray-light rounded mr-[6px]"></div>
            <div className="h-[16px] w-[30px] bg-gray-light rounded"></div>
            <div className="w-px h-[10px] bg-gray-light mx-[12px]"></div>
            <div className="h-[16px] w-[70px] bg-gray-light rounded"></div>
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-[48px] w-full bg-gray-light rounded"></div>
    </div>
  );
}

export default TeacherCardSkeleton;

