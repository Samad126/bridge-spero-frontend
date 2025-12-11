type ProfileActionsProps = {
  isOwnProfile: boolean;
  isBecomeStudent: boolean;
  onRateClick: () => void;
}

export default function ProfileActions({ isOwnProfile, isBecomeStudent, onRateClick }: ProfileActionsProps) {
  if (isOwnProfile) {
    return (
      <div className="flex flex-col gap-[12px] w-[200px]">
        <button className="bg-secondary text-white py-[12px] cursor-pointer">
          Edit Profile Info
        </button>
        {isBecomeStudent && (
          <button className="text-secondary border border-secondary py-[12px] cursor-pointer">
            Switch To Student
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[12px] w-[200px]">
      <button className="bg-secondary text-white py-[12px] cursor-pointer">
        Follow
      </button>
      <button
        onClick={onRateClick}
        className="text-secondary border border-secondary py-[12px] cursor-pointer"
      >
        Rate
      </button>
    </div>
  );
}
