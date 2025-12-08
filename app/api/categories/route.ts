import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")!;

  if (!access_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token.value}`);

  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
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
    console.error("Error fetching categories:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
