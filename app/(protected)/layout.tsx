// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const refreshToken = cookieStore.get("refreshToken");

  // if (!refreshToken) {
  //   redirect("/login");
  // }

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoute;
