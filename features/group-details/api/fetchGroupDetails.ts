import { GroupDetailsResponse } from "../types/groupDetailsTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function fetchGroupDetails(
  id: string
): Promise<GroupDetailsResponse> {
  const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch group details: ${response.statusText}`);
  }

  const data: GroupDetailsResponse = await response.json();
  return data;
}

