"use client";

import Link from "next/link";
import GroupList from "@/features/common/groups/components/GroupList";
import { useEffect, useState } from "react";
import { ExploreGroup } from "@/features/explore-groups/types/exploreGroupsTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

function GroupYouMightLike() {
  const [groups, setGroups] = useState<ExploreGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/groups/search?pageNumber=0&pageSize=4`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();
        setGroups(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load groups");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-secondary text-[20px]">Loading groups...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-red-500 text-[20px]">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  const transformedGroups = groups.map((group) => ({
    imageUrl: group.imageUrl,
    degree: group.category,
    language: group.language,
    subjectName: group.name,
    teacherName: `${group.teacherName} ${group.teacherSurname}`,
    price: group.price,
    id: group.id,
  }));

  return (
    <section>
      <div className="container">
        <h2 className="text-center text-primary text-[32px] leading-[130%] lg:text-[48px] xxl:text-[54px]">
          Groups You Might Like
        </h2>
        <p className="text-center text-secondary mx-auto max-w-[326px] mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] lg:max-w-[351px] xxl:text-[20px]">
          Learn the skills everyone&apos;s talking about with our trending
          courses
        </p>

        {transformedGroups.length === 0 ? (
          <div className="text-center text-secondary text-[18px] py-[40px]">
            No groups available
          </div>
        ) : (
          <>
            <GroupList groups={transformedGroups} />
            <Link
              href={"/explore-groups"}
              className="border mt-[15px] py-[12px] w-[200px] mx-auto block text-center border-secondary text-secondary"
            >
              More
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default GroupYouMightLike;
