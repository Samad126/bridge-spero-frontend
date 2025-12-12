import {
  ExploreGroupsResponse,
  ExploreGroupsFilters,
} from "../types/exploreGroupsTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function fetchExploreGroups(
  filters: ExploreGroupsFilters = {}
): Promise<ExploreGroupsResponse> {
  const { groupName, language, pageNumber = 0, pageSize = 1000 } = filters;

  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  if (groupName) {
    params.append("groupName", groupName);
  }

  if (language) {
    params.append("language", language);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/groups/search?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch explore groups: ${response.statusText}`);
    }

    const data: ExploreGroupsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching explore groups:", error);
    throw error;
  }
}
