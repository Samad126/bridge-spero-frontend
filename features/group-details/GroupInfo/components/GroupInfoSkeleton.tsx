function GroupInfoSkeleton() {
  return (
    <section>
      <div className="container flex gap-[80px] items-start">
        <div className="w-full animate-pulse">
          {/* GroupLevel skeleton */}
          <div className="flex flex-center items-center justify-center mb-[10px] xxl:mb-[12px] xxl:justify-start">
            <div className="h-[22px] w-[60px] bg-gray-light rounded"></div>
            <div className="w-px h-[10px] bg-gray-light mx-[12px]"></div>
            <div className="w-[16px] h-[16px] bg-gray-light rounded"></div>
            <div className="ml-1 h-[22px] w-[70px] bg-gray-light rounded"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-[42px] w-3/4 mx-auto bg-gray-light rounded mb-[32px] xxl:mx-0 xxl:h-[54px]"></div>

          {/* Description skeleton */}
          <div className="space-y-[12px] mb-[32px] xxl:mb-[24px]">
            <div className="h-[20px] w-full bg-gray-light rounded"></div>
            <div className="h-[20px] w-full bg-gray-light rounded"></div>
            <div className="h-[20px] w-3/4 bg-gray-light rounded"></div>
          </div>

          {/* GroupMetadata skeleton */}
          <div className="flex flex-wrap justify-center items-center gap-x-[24px] gap-y-[12.5px] xxl:gap-[54px] xxl:justify-start mb-[32px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[22px] h-[22px] bg-gray-light rounded"></div>
              <div className="h-[16px] w-[70px] bg-gray-light rounded"></div>
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="w-[22px] h-[22px] bg-gray-light rounded"></div>
              <div className="h-[16px] w-[100px] bg-gray-light rounded"></div>
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="w-[22px] h-[22px] bg-gray-light rounded"></div>
              <div className="h-[16px] w-[120px] bg-gray-light rounded"></div>
            </div>
          </div>

          {/* TeacherCard skeleton */}
          <div className="p-[24px] border border-gray-light mt-[32px] mb-[60px] xxl:mt-[24px] xxl:mb-[32px]">
            <div className="flex flex-col items-center gap-[12px] md:flex-row">
              <div className="flex justify-start">
                <div className="rounded-full w-[80px] h-[80px] bg-gray-light"></div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="h-[24px] w-[150px] bg-gray-light rounded mb-[10px]"></div>
                <div className="flex items-center gap-[12px]">
                  <div className="h-[16px] w-[40px] bg-gray-light rounded"></div>
                  <div className="h-[16px] w-[70px] bg-gray-light rounded"></div>
                  <div className="h-[16px] w-[90px] bg-gray-light rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs skeleton */}
          <div className="space-y-[24px]">
            <div className="flex gap-[24px] border-b border-gray-light">
              <div className="h-[40px] w-[100px] bg-gray-light rounded"></div>
              <div className="h-[40px] w-[100px] bg-gray-light rounded"></div>
              <div className="h-[40px] w-[100px] bg-gray-light rounded"></div>
            </div>
            <div className="space-y-[12px]">
              <div className="h-[20px] w-full bg-gray-light rounded"></div>
              <div className="h-[20px] w-full bg-gray-light rounded"></div>
              <div className="h-[20px] w-2/3 bg-gray-light rounded"></div>
            </div>
          </div>
        </div>

        {/* PricingCard skeleton */}
        <div className="hidden xxl:block sticky top-[102px] min-w-[403px]">
          <div className="relative w-full h-[300px] bg-gray-light rounded animate-pulse">
            <div className="absolute inset-0 p-[30px]">
              <div className="flex justify-between mb-[20px]">
                <div className="w-[46px] h-[46px] bg-gray-300 rounded"></div>
                <div className="w-[46px] h-[46px] bg-gray-300 rounded"></div>
              </div>
              <div className="h-[40px] w-[200px] bg-gray-300 rounded mb-[12px]"></div>
              <div className="h-[48px] w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupInfoSkeleton;

