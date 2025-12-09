import Image from 'next/image'
import React from 'react'

const TeacherProfile = () => {
    return (
        <section className="container flex flex-col gap-[24px] lg:flex-row">
            <div className='border border-1 border-gray-light flex flex-col '>
                <div className='w-full relative overflow-hidden h-[146px] w-[471px] lg:h-[262px]'>
                    <Image
                        src={'/teacher-profile-hero.jpg'}
                        alt='teacher-profile-hero'
                        // width={471}
                        // height={146}
                        fill
                        className='object-cover'
                    />
                </div>
                <div className='flex flex-col p-[12px] lg:flex-row lg:gap-[24px]'>
                    <div className='w-[314px] flex flex-col justify-center items-center lg:items-start pl-[24px] gap-[24px]'>
                        <Image
                            src={'/kamila-sultanli.jpg'}
                            alt='teacher'
                            width={100}
                            height={100}
                            className='rounded-full mt-[-50px] z-10 mx-auto lg:mx-0'
                        />
                        <div>
                            <h3 className='text-[32px] text-secondary text-center leading-[130%] font-medium lg:text-left'>Kamila Sultanli</h3>
                            <div className="w-[200px] flex items-center mx-auto lg:mx-0">
                                <Image
                                    src={"/star.svg"}
                                    width={16}
                                    height={16}
                                    alt={`star`}
                                    className="mr-[6px] w-[16px] h-[16px]"
                                />
                                <span className="text-custom-yellow">4.9</span>
                                <div className="w-px h-[10px] bg-tertiary mx-[12px]"></div>
                                <Image
                                    src={"/users-1.svg"}
                                    width={16}
                                    height={16}
                                    alt={`star`}
                                    className="mr-[6px] w-[16px] h-[16px]"
                                />
                                <span className="text-tertiary">300 students</span>
                            </div>
                        </div>

                        <p className='text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur. Est enim morbi vivamus viverra maecenas etiam. Nisl fringilla ut sed lacus amet habitant urna ipsum nunc. Sit gravida tempus quis laoreet aenean nunc enim facilisi bibendum. Maecenas et risus </p>
                        <button className='bg-secondary text-white py-[12px] px-[30px]'>Edit Profile Info</button>
                    </div>
                    <div className='lg:w-[577px] mt-5'>
                        <p className='text-primary text-center my-5'>Demo Lesson</p>
                        <div className='w-[326px] h-[159px] relative lg:w-[570px] lg:h-[278px]'>
                            <Image
                                src={'/demo-lesson.jpg'}
                                alt='demo-lesson'
                                // width={326}
                                // height={159}
                                fill
                                className='object-cover'
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[24px]'>
                <div className='border border-1 border-gray-light p-[12px]'>
                    <div className='flex flex-col gap-[24px] items-center p-[12px]'>
                        <h3 className='text-primary text-center text-[24px]'>Link Zoom to start your live lessons</h3>
                        <p className='text-center text-secondary'>Link your account and start teaching live in just a few clicks</p>
                        <button className='bg-secondary text-white py-[12px] px-[30px] '>Connect to Zoom</button>
                    </div>
                </div>
                <div className='border border-1 border-gray-light p-[12px]'>
                    <div className='flex flex-col gap-[24px] items-center p-[12px]'>
                        <h3 className='text-primary text-center text-[24px]'>Learning isn’t just for students — join the fun</h3>
                        <p className='text-center text-secondary'>Keep growing, stay curious, and bring that energy back to your teaching</p>
                        <button className='bg-secondary text-white py-[12px] px-[30px] '>Become a Student</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeacherProfile
