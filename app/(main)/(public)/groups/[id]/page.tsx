import GroupInfo from "@/features/group-details/GroupInfo/components/GroupInfo";
import { fetchGroupDetails } from "@/features/group-details/api/fetchGroupDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import GroupInfoSkeleton from "@/features/group-details/GroupInfo/components/GroupInfoSkeleton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const group = await fetchGroupDetails(id);

    return {
      title: `${group.name} | Bridge Spero`,
      description: group.description,
    };
  } catch {
    return {
      title: "Group Details | Bridge Spero",
      description: "View group details and enroll in courses",
    };
  }
}

async function page({ params }: PageProps) {
  const { id } = await params;

  try {
    const group = await fetchGroupDetails(id);

    return (
      <Suspense fallback={<GroupInfoSkeleton />}>
        <GroupInfo group={group} groupId={id} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading group details:", error);
    notFound();
  }
}

export default page;
