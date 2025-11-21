import Image from 'next/image'
import Link from 'next/link'
import { EventCardTypes } from '../../dashboardTypes'

const EventCard = ({time, isActive, subjectName, studentNumber}:EventCardTypes) => {
    return (
        <section className='w-[350px] max-w-[350px] h-[270px] p-[24px] border border-1 border-gray-light lg:max-w-[684px] lg:w-[684px] lg:h-[169px]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[6px]'>
                    <Image
                        width={22}
                        height={22}
                        src={'/clock.svg'}
                        alt=''
                    />
                    <span className='text-secondary leading-[100%] tracking-[0%] font-normal'>{time}</span>
                </div>
                <span className='text-secondary leading-[100%] tracking-[0%] font-normal'>{isActive?"active":"not active"}</span>
            </div>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div className='flex flex-col gap-[6px] mt-5 mb-19 lg:mb-0 lg:mt-12'>
                    <h3 className='text-[22px] text-primary leading-[100%] tracking-[0%]'>{subjectName}</h3>
                    <div className='flex items-center'>
                        <Image
                            width={20}
                            height={20}
                            src={'/users-1.svg'}
                            alt=''
                            className='text-secondary'
                        />
                        <span className='text-tertiary'>{studentNumber}</span>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-[12px] lg:mt-12 lg:flex-row-reverse'>
                    <Link href={'/'}>
                        <button className='w-[46px] h-[46px] border border-1 border-gray-light flex items-center justify-center'>
                            <Image
                                width={22}
                                height={22}
                                src={'/trash-2.svg'}
                                alt=''

                            />
                        </button>
                    </Link>
                    <Link href={'/'}>
                        <button className='w-[46px] h-[46px] border border-1 border-gray-light flex items-center justify-center'>
                            <Image
                                width={22}
                                height={22}
                                src={'/edit-2.svg'}
                                alt=''

                            />
                        </button>
                    </Link>
                    <Link href={'/'}>
                        <button className='h-[46px] w-[186px] bg-secondary text-white'>
                            Start Lesson
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default EventCard
