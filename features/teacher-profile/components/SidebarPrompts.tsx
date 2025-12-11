type SidebarPromptsProps = {
  isZoomConnected: boolean;
  isBecomeStudent: boolean;
}

export default function SidebarPrompts({ isZoomConnected, isBecomeStudent }: SidebarPromptsProps) {
  return (
    <div className="flex flex-col gap-[24px]">
      {!isZoomConnected && (
        <div className="border border-1 border-gray-light p-[12px]">
          <div className="flex flex-col items-center py-[24px] px-[12px] xxl:p-[30px]">
            <h3 className="text-primary mb-[12px] xxl:mb-[16px] text-center xxl:text-[32px] text-[24px]">
              Link Zoom to start your live lessons
            </h3>
            <p className="text-center text-secondary mb-[24px] xxl:mb-[42px]">
              Link your account and start teaching live in just a few clicks
            </p>
            <button className="bg-secondary text-white py-[12px] w-[200px] cursor-pointer text-[18px]">
              Connect to Zoom
            </button>
          </div>
        </div>
      )}

      {!isBecomeStudent && (
        <div className="border border-1 border-gray-light p-[12px]">
          <div className="flex flex-col items-center py-[24px] px-[12px] xxl:p-[30px]">
            <h3 className="text-primary mb-[12px] xxl:mb-[16px] text-center xxl:text-[32px] text-[24px]">
              Learning isn't just for students — join the fun
            </h3>
            <p className="text-center text-secondary mb-[24px] xxl:mb-[42px]">
              Keep growing, stay curious, and bring that energy back to your
              teaching
            </p>
            <button className="bg-secondary text-white py-[12px] w-[200px] cursor-pointer text-[18px]">
              Become a Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
