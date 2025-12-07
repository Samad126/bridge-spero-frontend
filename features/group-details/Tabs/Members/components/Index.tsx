import Image from "next/image";
import MemberList from "./MemberList";

function Members() {
  return (
    <div className="border border-gray-light p-[24px]">
      <div className="flex items-center gap-[12px]">
        <p className="text-secondary">300</p>
        <Image
          src="/users-dark.svg"
          alt="users"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
      </div>
      <MemberList />
    </div>
  );
}

export default Members;
