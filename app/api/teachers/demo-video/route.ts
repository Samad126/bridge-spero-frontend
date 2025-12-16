import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function PUT(request: Request) {
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

    const formData = await request.formData();

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token.value}`);
    // Don't set Content-Type for FormData - fetch will set it with boundary

    const response = await fetch(`${API_BASE_URL}/teachers/demo-video`, {
      method: "PUT",
      headers,
      body: formData,
      cache: "no-store",
    });

    if (response.status === 204) {
      return new Response(null, {
        status: 204,
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error uploading demo video:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to upload demo video",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
