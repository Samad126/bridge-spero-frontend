import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    if (!access_token) {
      return new Response(
        JSON.stringify({
          errorCode: "UNAUTHORIZED",
          errorMessage: "No access token found",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token.value}`);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${API_BASE_URL}/teachers/schedule`, {
      headers,
      cache: "no-store",
    });

    // If response is not ok (4xx or 5xx), still try to parse and return with original status
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        // If JSON parsing fails, return a generic error with the original status code
        errorData = {
          errorCode: "API_ERROR",
          errorMessage: `API request failed with status ${response.status}`,
        };
      }

      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Teacher schedule API error:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_SERVER_ERROR",
        errorMessage: "An error occurred while fetching teacher schedule data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

