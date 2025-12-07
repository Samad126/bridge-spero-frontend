import Image from "next/image";

function MemberItem() {
  return (
    <div className="flex items-center gap-[12px] border-b border-gray-light p-[12px]">
      <div className="w-[42px] h-[42px] flex items-center justify-center bg">
        <Image
          src="/user.svg"
          alt="user"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
      </div>
      <p>Ilham Qadalov</p>
    </div>
  );
}

export default MemberItem;
