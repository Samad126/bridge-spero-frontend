const EventCardSkeleton = () => {
  return (
    <div className="w-full h-[270px] p-[24px] border border-gray-light lg:h-[169px] animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <div className="w-[22px] h-[22px] bg-gray-200 rounded"></div>
          <div className="h-[16px] bg-gray-200 rounded w-[50px]"></div>
        </div>
        <div className="h-[16px] bg-gray-200 rounded w-[80px]"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[6px] mt-5 mb-19 lg:mb-0 lg:mt-12">
          <div className="h-[22px] bg-gray-200 rounded w-[200px]"></div>
          <div className="flex items-center gap-[6px]">
            <div className="w-[20px] h-[20px] bg-gray-200 rounded"></div>
            <div className="h-[16px] bg-gray-200 rounded w-[120px]"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-[12px] lg:mt-12">
          <div className="h-[46px] w-[186px] bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;

