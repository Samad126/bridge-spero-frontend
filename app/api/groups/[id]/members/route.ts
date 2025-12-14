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

    // Get search query parameter from URL
    const { searchParams } = new URL(request.url);
    const fullName = searchParams.get("fullName");

    // Build URL with query parameter if provided
    const url = new URL(`${API_BASE_URL}/groups/${id}/members`);
    if (fullName) {
      url.searchParams.append("fullName", fullName);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token.value}`,
      },
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
    console.error("Error fetching group members:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to fetch group members",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token.value}`);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${API_BASE_URL}/groups/${id}/members`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    if (response.status === 201) {
      return new Response(null, {
        status: 204,
      });
    }

    // Handle error responses from backend
    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
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
    console.error("Error joining group:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to join group",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
