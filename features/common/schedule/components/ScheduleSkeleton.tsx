const ScheduleSkeleton = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-[32px] items-center justify-between mb-[32px] xxl:mb-[12px] xxl:flex-row">
          {/* Title skeleton */}
          <div className="h-[32px] bg-gray-200 rounded w-[150px] animate-pulse"></div>
          {/* Date skeleton */}
          <div className="h-[24px] bg-gray-200 rounded w-[200px] animate-pulse"></div>
        </div>
        
        <div className="p-[24px] border border-gray-light">
          {/* Desktop view skeleton */}
          <div className="hidden space-x-[12px] xxl:flex">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex-1 animate-pulse">
                {/* Day name */}
                <div className="h-[24px] bg-gray-200 rounded w-full mb-[12px]"></div>
                {/* Lesson cards */}
                <div className="space-y-[12px]">
                  <div className="h-[80px] bg-gray-200 rounded"></div>
                  <div className="h-[80px] bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile view skeleton */}
          <div className="xxl:hidden">
            <div className="flex justify-between items-center mb-[24px]">
              <div className="w-[46px] h-[46px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-[24px] bg-gray-200 rounded w-[120px] animate-pulse"></div>
              <div className="w-[46px] h-[46px] bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-[12px]">
              <div className="h-[80px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-[80px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-[80px] bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSkeleton;

