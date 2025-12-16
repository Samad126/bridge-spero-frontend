import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");

  if (!access_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token.value}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === 204) {
    return new Response(null, {
      status: 200,
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
