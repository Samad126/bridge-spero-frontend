import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function POST() {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get("refresh_token");

  if (!refresh_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refresh_token.value }),
    });

    const contentType = res.headers.get("content-type");
    const contentLength = res.headers.get("content-length");

    let data = {};

    if (contentType?.includes("application/json") && contentLength !== "0") {
      const text = await res.text();
      if (text && text.trim()) {
        data = JSON.parse(text);
      }
    }

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    res.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append(key, value);
      }
    });

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return new Response(JSON.stringify({ error: "Failed to refresh token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
