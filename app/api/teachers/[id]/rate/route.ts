import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const body = await request.json();
    const { rating } = body;

    if (!rating || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({
          errorCode: "INVALID_RATING",
          errorMessage: "Rating must be between 1 and 5",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(`${API_BASE_URL}/teachers/${id}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token.value}`,
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
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
    console.error("Error rating teacher:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to rate teacher",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
