import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET() {
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

  try {
    const response = await fetch(`${API_BASE_URL}/zoom/oauth/verify`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Zoom verify error:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_SERVER_ERROR",
        errorMessage: "Failed to verify Zoom connection",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
