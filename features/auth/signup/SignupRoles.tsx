// 2 cur register hissesi var(student ve teacher)

import Link from "next/link"
import AuthLogo from "../AuthLogo"
// import AuthLogo from "../components/AuthLogo"

function page() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <section className="w-[350px] h-[369px] flex flex-col items-center justify-center border border-1 border-gray-light p-[32px] gap-[24px] xxl:w-[692px] xxl:h-[468px]">
        <AuthLogo />
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-[32px] text-center leading-[100%] xxl:text-[48px]">Join <span className="text-secondary">Bridge</span>Spero</h2>
          <p className="text-center text-tertiary leading-[130%] xxl:text-[20px]">Choose your role to get started</p>
        </div>

        <div className="w-[100%] h-[110px] flex justify-between">
          <Link href={'/'}>
            <button className="border border-1 border-gray-light w-[137px] h-[100%] text-[18px] text-primary xxl:w-[302px]">Student</button>
          </Link>
          <Link href={'/'}>
            <button className="border border-1 border-gray-light w-[137px] h-[100%] text-[18px] text-primary xxl:w-[302px]">Teacher</button>
          </Link>
        </div>
        <p className="text-center text-tertiary leading-[130%]">Already have an account? <span className="text-primary"><Link href={'/'}>Sign In</Link></span></p>
      </section>
    </div>
  )
}

export default page