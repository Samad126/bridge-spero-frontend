import { TrendingTeachersResponse } from "../types/trendingTeachersTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function fetchTrendingTeachers(
  pageNumber: number = 0,
  pageSize: number = 10
): Promise<TrendingTeachersResponse> {
  const url = `${API_BASE_URL}/teachers/top-rated?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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
        `Failed to fetch trending teachers: ${response.status} ${response.statusText}`
      );
    }

    const data: TrendingTeachersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending teachers:", error);
    throw error;
  }
}
