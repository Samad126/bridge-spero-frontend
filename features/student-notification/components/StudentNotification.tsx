import Image from 'next/image'
import React from 'react'
import type { StudentNotification } from '../types/notificationtypes'

const StudentNotification = () => {
    const studentNotifications: StudentNotification[] = [
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "others",
            title: "Kamila Sultanli accepted your request",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "others",
            title: "Kamila Sultanli shared syllabus",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "others",
            title: "Kamila Sultanli shared syllabus",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },
        {
            type: "others",
            title: "Kamila Sultanli shared syllabus",
            subject: "Chemistry"
        },
        {
            type: "lesson-starting",
            title: "Lesson starting in 15 minutes",
            subject: "Chemistry"
        },

    ]
    return (
        <section className="container">
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-[32px] text-primary mt-10 mb-15 leading-[130%] xxl:text-[54px] xxl:mt-0'>Notifications</h2>
                <div className='grid grid-cols-1 gap-[12px] xxl:grid-cols-3 xxl:grid-rows-4'>
                    {studentNotifications.map((item, index) => (
                        <div key={index} className='w-[350px] h-[119px] flex items-center gap-[20px] border border-1 border-gray-light p-[20px] xxl:w-[452px] xxl:h-[95px]'>
                            {item.type === "others" && (
                                <div className='relative w-[54px] h-[54px]'>
                                    <Image
                                        alt=''
                                        src={'/kamila-sultanli.jpg'}
                                        className="rounded-full object-cover"
                                        width={54}
                                        height={54}
                                    />

                                </div>
                            )}
                            <div className='flex flex-col  gap-[12px]'>
                                <h3 className='text-[20px] text-secondary leading-[100%]'>{item.title}</h3>
                                <p className='text-tertiary leading-[100%]'>{item.subject}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default StudentNotification
