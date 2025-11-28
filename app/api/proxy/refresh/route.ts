import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")!;

  if (!refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = await fetch("http://localhost:3000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken.value }),
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
