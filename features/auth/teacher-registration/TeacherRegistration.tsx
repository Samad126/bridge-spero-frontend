import React from 'react'
import AuthLogo from '../AuthLogo'
import Link from 'next/link'
import Image from 'next/image'

const StudentRegistration = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center my-10">
            <section className="w-[350px] h-[100%] mx-auto flex flex-col items-center justify-center border border-1 border-gray-light p-[32px] gap-[24px] lg:w-[692px] ">
                <AuthLogo />
                <div className='flex flex-col gap-[12px]'>
                    <h2 className="text-primary text-[28px] text-center leading-[100%] lg:text-[48px]">Teacher Registration</h2>
                    <p className="text-tertiary text-center leading-[130%] lg:text-[20px]">Share your knowledge and inspire students</p>
                </div>
                <div>
                    <form action="" className="flex flex-col gap-[24px] lg:flex-row lg:flex-wrap">
                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">First Name *</label>
                            <input type="text" placeholder="First Name" className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">Last Name *</label>
                            <input type="text" placeholder="Last Name" className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">Email *</label>
                            <input type="email" placeholder="Email" className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%] block">Phone Number *</label>
                            <select name="" id="" className="w-[90px] h-[50px] p-[12px] leading-[130%] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0">
                                <option value="all">+994</option>
                            </select>
                            <input type="email" placeholder="Phone Number" className="w-[194px] p-[12px] leading-[130%] border border-1 border-gray-light placeholder-gray-light  outline-0 lg:w-[200px]" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">Password *</label>
                            <input type="password" placeholder="Password" className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">Confirm Password *</label>
                            <input type="password" placeholder="Confirm Password" className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0" />
                        </p>

                        <p className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="" className="leading-[100%]">Choose Subjects *</label>
                            <select className="w-[100%] h-[50px] p-[12px] gap-[10px] border border-1 border-gray-light mt-[10px] outline-0 text-gray-light">
                                <option value="all">Choose</option>
                            </select>
                        </p>

                        <div className='w-[100%] lg:w-[48%]'>
                            <label htmlFor="syllabus" className="block mb-[10px]">
                                Demo Lesson Video *
                            </label>
                            <label
                                htmlFor="syllabus"
                                className="flex items-center h-[50px] border border-gray-light cursor-pointer"
                            >
                                <div className="h-[50px] w-[43px] flex items-center justify-center border-r border-gray-light">
                                    <Image
                                        src="/upload.svg"
                                        alt="upload"
                                        width={20}
                                        height={20}
                                        className="min-w-[20px] h-[20px]"
                                    />
                                </div>
                                <span className="flex-1 px-[12px] text-gray-400">Upload File</span>
                                <input id="syllabus" type="file" className="hidden" />
                            </label>
                        </div>

                        <p className='w-[100%]'>
                            <label htmlFor="" className="leading-[100%]">Bio</label>
                            <textarea placeholder='Bio' className="w-[100%] p-[12px] gap-[10px] border border-1 border-gray-light placeholder-gray-light mt-[10px] outline-0 text-gray-light">
                            </textarea>
                            {/* <textarea name="" id=""></textarea> */}
                        </p>
                        <div className='flex items-center gap-[12px]'>
                            <input type="checkbox" className='w-[18px] h-[18px] border border-1 border-gray-light' />
                            <label htmlFor="" className='text-[15px] leading-[100%] lg:block'>I agree to the <span className='text-primary'>terms and conditions</span></label>
                        </div>
                        <button className="w-[100%] text-[18px] text-custom-white bg-secondary p-[12px]">Create Teacher Account</button>
                        <p className="w-[100%] text-center">Already have an account? <span className="text-primary"><Link href={'/'}>Sign Up</Link></span></p>
                    </form>
                </div>

            </section>
        </div>
    )
}

export default StudentRegistration
