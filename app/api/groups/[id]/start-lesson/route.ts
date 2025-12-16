import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET(
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
      method: "GET",
      headers,
      cache: "no-store",
    });

    console.log("START LESSON RESPONSE", response);

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

    // Backend returns plain text (the Jitsi URL) on success
    const jitsiUrl = await response.text();

    // Return the plain Jitsi URL string
    return new Response(jitsiUrl, {
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
