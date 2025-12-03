import {
  ExploreTeachersResponse,
  ExploreTeachersFilters,
} from "../types/exploreTeachersTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function fetchExploreTeachers(
  filters: ExploreTeachersFilters = {}
): Promise<ExploreTeachersResponse> {
  const { name, pageNumber = 0, pageSize = 10 } = filters;

  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  if (name) {
    params.append("name", name);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/teachers/search?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch explore teachers: ${response.statusText}`
      );
    }

    const data: ExploreTeachersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching explore teachers:", error);
    throw error;
  }
}

