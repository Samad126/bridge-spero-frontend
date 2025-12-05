const WelcomeBackSkeleton = () => {
  return (
    <section>
      <div className="container">
        {/* Title skeleton */}
        <div className="h-[44px] bg-gray-200 rounded w-[300px] mx-auto mb-10 animate-pulse xxl:h-[70px] xxl:w-[400px]"></div>
        
        {/* Stats container */}
        <div className="border border-gray-light max-w-[350px] mx-auto lg:max-w-[1440px] lg:flex lg:border-none xxl:max-w-[1440px] lg:justify-center lg:space-x-[110px] lg:items-center xxl:lg:space-x-[150px]">
          {/* Stat 1 */}
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse lg:py-0 lg:px-0!">
            <div className="h-[20px] bg-gray-200 rounded w-[120px] animate-pulse xxl:h-[24px]"></div>
            <div className="h-[24px] bg-gray-200 rounded w-[40px] animate-pulse lg:mb-[5px] lg:h-[26px] xxl:h-[32px]"></div>
          </div>
          
          <hr className="border-gray-light lg:hidden" />
          <div className="hidden w-px border-l border-secondary h-[48px] bg-red-500 lg:block"></div>
          
          {/* Stat 2 */}
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse xxl:pl-[20px] lg:py-0 lg:px-0!">
            <div className="h-[20px] bg-gray-200 rounded w-[160px] animate-pulse xxl:h-[24px]"></div>
            <div className="h-[24px] bg-gray-200 rounded w-[40px] animate-pulse lg:mb-[5px] lg:h-[26px] xxl:h-[32px]"></div>
          </div>
          
          <hr className="border-gray-light lg:hidden" />
          <div className="hidden w-px border-l border-secondary h-[48px] bg-red-500 lg:block"></div>
          
          {/* Stat 3 */}
          <div className="flex justify-between px-[20px] py-[14.5px] lg:flex lg:flex-col-reverse lg:py-0 lg:px-0!">
            <div className="h-[20px] bg-gray-200 rounded w-[120px] animate-pulse xxl:h-[24px]"></div>
            <div className="h-[24px] bg-gray-200 rounded w-[40px] animate-pulse lg:mb-[5px] lg:h-[26px] xxl:h-[32px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBackSkeleton;

