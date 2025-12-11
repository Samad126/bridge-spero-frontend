import { useRouter } from "next/navigation";

type ProfileActionsProps = {
  isOwnProfile: boolean;
  isBecomeStudent: boolean;
  isLoggedIn: boolean;
  onRateClick: () => void;
  onEditClick?: () => void;
};

export default function ProfileActions({
  isOwnProfile,
  isBecomeStudent,
  isLoggedIn,
  onRateClick,
  onEditClick,
}: ProfileActionsProps) {
  const router = useRouter();

  const handleRateClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    onRateClick();
  };

  if (isOwnProfile) {
    return (
      <div className="flex flex-col gap-[12px] w-[200px]">
        <button onClick={onEditClick} className="bg-secondary text-white py-[12px] cursor-pointer">
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
        onClick={handleRateClick}
        className="text-secondary border border-secondary py-[12px] cursor-pointer"
      >
        Rate
      </button>
    </div>
  );
}
