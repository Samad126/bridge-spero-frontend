// 2 cur register hissesi var(student ve teacher)

import SignupRoles from "@/features/auth/signup/SignupRoles"

export const metadata = {
  title: "Signup | Bridge Spero",
  description: "Signup to Bridge Spero",
};

function page() {
  return (
    <SignupRoles/>
  )
}

export default page