"use client";

import Image from "next/image";
import { MemberStudent } from "@/features/group-details/types/groupDetailsTypes";
import { useDeleteMemberMutation } from "@/features/group-details/api/groupDetailsApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MemberItemProps {
  member: MemberStudent;
  groupId: number;
  isTeacher: boolean;
}

function MemberItem({ member, groupId, isTeacher }: MemberItemProps) {
  const [deleteMember, { isLoading }] = useDeleteMemberMutation();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove ${member.name} ${member.surname} from this group?`)) {
      return;
    }

    try {
      await deleteMember({
        groupId,
        studentId: member.id,
      }).unwrap();

      router.refresh();

      console.log("Member deleted successfully");
    } catch (error) {
      console.error("Failed to delete member:", error);
      alert("Failed to remove member. Please try again.");
    }
  };

  // Determine profile URL based on role
  const profileUrl = member.role === "TEACHER"
    ? `/teachers/${member.id}`
    : `/users/${member.id}`;

  return (
    <div className="flex items-center justify-between gap-[12px] border-b border-gray-light p-[12px]">
      <Link href={profileUrl} className="flex items-center gap-[12px] flex-1 hover:opacity-80 transition-opacity">
        <div className="w-[42px] h-[42px] flex items-center justify-center bg">
          <Image
            src="/user.svg"
            alt="user"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
        </div>
        <p>{member.name} {member.surname}</p>
      </Link>
      {isTeacher && (
        <button
          onClick={handleDelete}
          className="disabled:opacity-50"
          disabled={isLoading}
        >
          <Image src={"/trash-2.svg"} alt="delete" width={22} height={22} />
        </button>
      )}
    </div>
  );
}

export default MemberItem;
