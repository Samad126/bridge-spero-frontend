interface GroupCardSkeletonProps {
  col?: 1 | 2;
}

const GroupCardSkeleton = ({ col = 1 }: GroupCardSkeletonProps) => {
  // Adjust styles based on column layout (only for mobile)
  const imageHeight = col === 1 ? "h-[240px] md:h-[240px]" : "h-[120px] md:h-[240px]";
  const padding = col === 1 ? "p-[20px] md:p-[20px]" : "p-[12px] md:p-[20px]";
  const marginBottom = col === 1 ? "mb-[24px] mt-[12px]" : "mb-[12px] mt-[6px] md:mb-[24px] md:mt-[12px]";

  return (
    <div className="flex-1 border border-gray-light animate-pulse">
      {/* Image skeleton */}
      <div className={`relative w-full ${imageHeight} bg-gray-light`}></div>

      <div className={padding}>
        {/* Metadata skeleton */}
        <div className="flex items-center">
          <div className="h-[14px] w-[60px] bg-gray-light rounded"></div>
          <div className="w-px h-[10px] bg-gray-light mx-[12px]"></div>
          <div className="w-[16px] h-[16px] bg-gray-light rounded"></div>
          <div className="ml-1 h-[14px] w-[50px] bg-gray-light rounded"></div>
        </div>

        {/* Title and teacher name skeleton */}
        <div className={marginBottom}>
          <div className="h-[24px] w-3/4 bg-gray-light rounded mb-[8px]"></div>
          <div className="h-[14px] w-1/2 bg-gray-light rounded"></div>
        </div>

        {/* Price and button skeleton */}
        <div className="flex justify-between items-center gap-[24px]">
          <div className="h-[20px] w-[60px] bg-gray-light rounded"></div>
          <div className="w-[80%] h-[48px] bg-gray-light rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default GroupCardSkeleton;

