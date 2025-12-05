import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get("refresh_token")!;

  if (!refresh_token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = await fetch("http://localhost:3000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refresh_token.value }),
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
