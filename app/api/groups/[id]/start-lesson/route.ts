import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token.value}`);

  try {
    const response = await fetch(`${API_BASE_URL}/groups/${id}/start-lesson`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      // Backend returns JSON error
      const errorData = await response.json();
      return new Response(
        JSON.stringify(errorData),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Backend returns plain text (the Zoom URL) on success
    const zoomUrl = await response.text();

    // Return the plain Zoom URL string
    return new Response(zoomUrl, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Start lesson error:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_SERVER_ERROR",
        errorMessage: "Failed to start lesson",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
