import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import 'swiper/css';

async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  const refresh_token = cookieStore.get("refresh_token");

  const isAuthenticated = !!access_token || !!refresh_token;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoute;
