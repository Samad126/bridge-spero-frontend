export async function POST() {
  const headers = new Headers();
  headers.append("Set-Cookie", "access_token=; Max-Age=0; Path=/; HttpOnly");
  headers.append("Set-Cookie", "refresh_token=; Max-Age=0; Path=/; HttpOnly");
  return new Response("OK", { headers });
}
