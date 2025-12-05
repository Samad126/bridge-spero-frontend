// example /me route

import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")!;

  if (!access_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${access_token.value}`);
  const response = await fetch("http://localhost:3000/auth/me", {
    headers,
  });

  const data = await response.json();
  console.log("data", data);

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: response.headers,
  });
}
