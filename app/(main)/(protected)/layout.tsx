// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

import 'swiper/css';

async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const refresh_token = cookieStore.get("refresh_token");

  // if (!refresh_token) {
  //   redirect("/login");
  // }

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoute;
