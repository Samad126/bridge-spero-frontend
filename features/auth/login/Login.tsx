import Link from "next/link"
import AuthLogo from "../AuthLogo"

function page() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <section className="w-[350px] h-[494px] mx-auto flex flex-col items-center justify-center border border-gray-light p-[32px] gap-[24px] xxl:w-[408px] xxl:h-[543px]">
                <AuthLogo />
                <div className="flex flex-col gap-[12px]">
                    <h2 className="text-primary text-[28px] text-center leading-[100%] xxl:text-[48px]">Welcome Back</h2>
                    <p className="text-tertiary text-center leading:[130%] xxl:text-[20px]">Sign in your account to continue</p>
                </div>
                <div>
                    <form action="" className="flex flex-col gap-[24px]">
                        <div>
                            <label htmlFor="" className="leading-[100%]">Email</label>
                            <input type="email" placeholder="Email" className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light mt-[10px]" />
                        </div>
                        <div>
                            <div className="w-full flex justify-between">
                                <label htmlFor="">Password</label>
                                <Link href={'/'} className="text-primary">Forgot password?</Link>
                            </div>
                            <input type="password" placeholder="Password" className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light mt-[10px]" />
                        </div>

                        <button className="text-[18px] text-custom-white bg-secondary p-[12px]">Sign In</button>
                        <p className="text-center">Don&apos;t have an account? <span className="text-primary"><Link href={'/signup'}>Sign Up</Link></span></p>
                    </form>
                </div>

            </section>
        </div>
    )
}

export default page