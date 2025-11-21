import Link from 'next/link'
import { EventCardTypes } from '../../dashboardTypes'
import EventCard from './EventCard'

const TodaysEvents = () => {
    const events: EventCardTypes[] = [
        {
            time: "15:00",
            isActive: true,
            subjectName: "Advanced Mathematics",
            studentNumber: "12/15"
        },
        {
            time: "15:00",
            isActive: false,
            subjectName: "Advanced Mathematics",
            studentNumber: "12/15"
        },
        {
            time: "15:00",
            isActive: true,
            subjectName: "Advanced Mathematics",
            studentNumber: "12/15"
        },
        {
            time: "15:00",
            isActive: false,
            subjectName: "Advanced Mathematics",
            studentNumber: "12/15"
        },

    ]
    return (
        <section className='max-w-[350px] lg:max-w-[1440px] my-10'>
            <div className='flex flex-col items-center justify-center lg:flex-row lg:justify-between'>
                <h2 className='text-primary text-[32px]'>Today's Events</h2>
                <Link href={'/'} className='border border-1 text-[18px] py-[12px] px-[30px] my-8'>+ Create Group</Link>
            </div>
            <div className='flex flex-wrap gap-[12px] [&>*:last-child]:hidden xxl:[&>*:last-child]:block'>
                {events.map((item, index) => (
                    <EventCard
                        time={item.time}
                        isActive={item.isActive}
                        subjectName={item.subjectName}
                        studentNumber={item.studentNumber}
                        key={index}
                    />
                ))}
            </div>
            <Link href={'/'} className='border border-1 text-[18px] w-[200px] mx-auto flex justify-center py-[12px] px-[30px] my-8'>More</Link>

        </section>
    )
}

export default TodaysEvents
