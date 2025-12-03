import { TrendingGroupsResponse } from "../types/trendingGroupsTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function fetchTrendingGroups(
  pageNumber: number = 0,
  pageSize: number = 10
): Promise<TrendingGroupsResponse> {
  const url = `${API_BASE_URL}/groups/top-rated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch trending groups: ${response.status} ${response.statusText}`
      );
    }

    const data: TrendingGroupsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending groups:", error);
    throw error;
  }
}
