import Link from 'next/link'
import React from 'react'
import { StudentEventTypes } from '../types/studentEventTypes'
import EventCard from './EventCards'

const StudentTodaysEvents = () => {
    const studentDashboardEvents: StudentEventTypes[] = [
        {
            time: "15:00",
            isActive: true,
            subjectName: "Advanced Mathematics",
            teacherName: "Dr. Sarah Chen",
        },
        {
            time: "15:00",
            isActive: false,
            subjectName: "Advanced Mathematics",
            teacherName: "Dr. Sarah Chen",
        },
        {
            time: "15:00",
            isActive: true,
            subjectName: "Advanced Mathematics",
            teacherName: "Dr. Sarah Chen",
        },
        {
            time: "15:00",
            isActive: false,
            subjectName: "Advanced Mathematics",
            teacherName: "Dr. Sarah Chen",
        },
    ]
    return (
        <section>
            <div className="container">
                <div className="flex flex-col items-center justify-center xxl:flex-row xxl:justify-between mb-8">
                    <h2 className="mb-[32px] text-primary text-[32px] xxl:mb-0">Today&apos;s Events</h2>
                    <Link
                        href={"/"}
                        className="border text-[18px] py-[12px] px-[30px]"
                    >
                        + Create Group
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-[12px] [&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block xxl:grid-cols-2">
                    {studentDashboardEvents.map((item, index) => (
                        <EventCard
                            time={item.time}
                            isActive={item.isActive}
                            subjectName={item.subjectName}
                            teacherName={item.teacherName}
                            key={index}
                        />
                    ))}
                </div>
                <Link
                    href={"/"}
                    className="border text-[18px] w-[200px] mx-auto flex justify-center py-[12px] px-[30px] my-8"
                >
                    More
                </Link>
            </div>
        </section>
    )
}

export default StudentTodaysEvents
