export default function POST() {
  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    "access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure"
  );

  headers.append(
    "Set-Cookie",
    "refresh_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure"
  );

  return new Response(null, {
    status: 200,
    headers,
  });
}
