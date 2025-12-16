import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")!;

  if (!access_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  if (searchParams.has("status")) {
    params.append("status", searchParams.get("status")!);
  } else {
    params.append("status", "ACTIVE");
  }
  if (searchParams.has("groupName")) {
    params.append("groupName", searchParams.get("groupName")!);
  }
  if (searchParams.has("language")) {
    params.append("language", searchParams.get("language")!);
  }
  if (searchParams.has("categoryId")) {
    params.append("categoryId", searchParams.get("categoryId")!);
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token.value}`);

  try {
    const response = await fetch(
      `${API_BASE_URL}/users/groups?${params.toString()}`,
      {
        headers,
        cache: "no-store",
      }
    );

    console.log("STUDENT GROUPS DATA", response);

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching student groups:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
