import Login from "@/features/auth/login/Login"

export const metadata = {
  title: "Login | Bridge Spero",
  description: "Login to Bridge Spero",
};

function page() {
  return (
    <Login/>
  )
}

export default page