import Image from 'next/image'
import React from 'react'
import { GroupCardItem } from '../../homepageTypes'
import Link from 'next/link'

const GroupCard = ({ imageUrl, degree, language, subjectName, teacherName, price }: GroupCardItem) => {
    return (
        <div className='flex-1 border border-gray-light my-3'>
            <div className='w-[100%] h-[220px] object-cover'>
                {/* <Image
                    src={imageUrl}
                    width={350}
                    height={220}
                    alt=''
                    className='w-[350px] h-[220px] object-cover'
                /> */}
                <img src={imageUrl} alt="" className='w-[100%] h-[100%]' />
            </div>

            {/* <img src={imageUrl} alt="" width={350} height={220} /> */}
            <div className='p-[20px]'>
                <div className='flex flex-center items-center'>
                    <span className='text-tertiary text-[14px]'>{degree}</span>
                    <div className='w-px h-[10px] bg-tertiary mx-[12px]'></div>
                    <Image
                        width={16}
                        height={16}
                        src={"/globe.svg"}
                        alt=''
                        className='w-[16px] h-[16px]'
                    />
                    <span className='ml-1 text-tertiary text-[14px]'>{language}</span>
                </div>
                <div className='mb-10 mt-3'>
                    <p className='text-secondary text-[24px]'>{subjectName}</p>
                    <p className='text-tertiary text-[14px]'>{teacherName}</p>
                </div>
                <div className="flex justify-between items-center">
                    <span className='text-[20px] text-secondary'>{price}$</span>
                    <Link href='/groups' className='w-[80%] block text-center py-[11px] bg-secondary text-white h-[46px]'>Details</Link>
                </div>
            </div>
        </div>
    )
}

export default GroupCard
