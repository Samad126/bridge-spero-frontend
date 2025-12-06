interface PricingCardSkeletonProps {
  isOpened?: boolean;
}

function PricingCardSkeleton({ isOpened = true }: PricingCardSkeletonProps) {
  return (
    <div className="fixed flex flex-col items-center bottom-[20px] inset-x-[20px] z-10 xxl:sticky xxl:top-[102px] xxl:min-w-[403px]">
      <button
        className="bg-secondary py-[6px] px-[12px] xxl:hidden"
        disabled
      >
        <div className="w-[22px] h-[22px] bg-gray-light rounded animate-pulse"></div>
      </button>

      <div
        className={`relative w-full bg-gray-700 bg-cover bg-center overflow-hidden transition-all px-[30px] animate-pulse ${
          isOpened ? "py-[30px]" : "h-[6px]"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

        <div className={`relative ${isOpened ? "max-h-none" : "max-h-0"}`}>
          {/* Action buttons skeleton */}
          <div className="flex justify-between gap-[12px]">
            <div className="flex gap-[12px]">
              <div className="p-[12px] border border-tertiary w-[46px] h-[46px] bg-gray-light/20"></div>
              <div className="p-[12px] border border-tertiary w-[46px] h-[46px] bg-gray-light/20"></div>
            </div>
            <div className="p-[12px] border border-tertiary w-[46px] h-[46px] bg-gray-light/20"></div>
          </div>

          {/* Price skeleton */}
          <div className="mt-[20px] mb-[12px]">
            <div className="h-[32px] w-[180px] bg-gray-light/30 rounded"></div>
          </div>

          {/* Button skeleton */}
          <div className="w-full h-[48px] bg-gray-light/30 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default PricingCardSkeleton;

