"use client";

import Link from 'next/link'
import EventCard from './EventCards'
import EventCardSkeleton from './EventCardSkeleton'
import { useGetStudentDashboardQuery } from '../../api/studentDashboardApi';

const StudentTodaysEvents = () => {
    const { data, isLoading, error } = useGetStudentDashboardQuery();

    if (isLoading) {
        return (
            <section>
                <div className="container">
                    <div className="flex flex-col items-center justify-center xxl:flex-row xxl:justify-between mb-8">
                        <h2 className="mb-[32px] text-primary text-[32px] xxl:mb-0">Today&apos;s Events</h2>
                        <Link
                            href={"/explore-groups"}
                            className="border text-[18px] py-[12px] px-[30px]"
                        >
                            Explore Groups
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-[12px] [&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block xxl:grid-cols-2">
                        {[...Array(4)].map((_, index) => (
                            <EventCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <div className="container">
                    <div className="h-[200px] flex items-center justify-center">
                        <div className="text-red-500 text-[20px]">Failed to load events</div>
                    </div>
                </div>
            </section>
        );
    }

    const groups = data?.groups || [];

    return (
        <section>
            <div className="container">
                <div className="flex flex-col items-center justify-center xxl:flex-row xxl:justify-between mb-8">
                    <h2 className="mb-[32px] text-primary text-[32px] xxl:mb-0">Today&apos;s Events</h2>
                    <Link
                        href={"/explore-groups"}
                        className="border text-[18px] py-[12px] px-[30px]"
                    >
                        Explore Groups
                    </Link>
                </div>
                {groups.length === 0 ? (
                    <div className="text-center text-secondary text-[18px] py-[40px]">
                        No events scheduled for today
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-[12px] [&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block xxl:grid-cols-2">
                            {groups.map((group) => (
                                <EventCard
                                    key={group.id}
                                    id={group.id}
                                    time={group.startTime}
                                    isActive={group.isMeetingActive}
                                    subjectName={group.name}
                                    teacherName={group.teacher}
                                    joinUrl={group.joinUrl}
                                    status={group.status}
                                />
                            ))}
                        </div>
                        {groups.length > 3 && (
                            <Link
                                href={"/my-groups"}
                                className="border text-[18px] w-[200px] mx-auto flex justify-center py-[12px] px-[30px] my-8"
                            >
                                More
                            </Link>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default StudentTodaysEvents
