export async function POST() {
  const headers = new Headers();
  headers.append("Set-Cookie", "accessToken=; Max-Age=0; Path=/; HttpOnly");
  headers.append("Set-Cookie", "refreshToken=; Max-Age=0; Path=/; HttpOnly");
  return new Response("OK", { headers });
}
