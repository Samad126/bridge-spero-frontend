import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Include authorization if available (optional auth)
    if (access_token) {
      headers.append("Authorization", `Bearer ${access_token.value}`);
    }

    const response = await fetch(`${API_BASE_URL}/teachers/${id}/groups`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching teacher groups:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to fetch teacher groups",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
