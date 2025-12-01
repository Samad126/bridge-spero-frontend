// example /me route

import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")!;

  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken.value}`);
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
