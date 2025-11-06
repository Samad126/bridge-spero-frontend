import Image from 'next/image'

const WhyBridgeSpero = () => {

    return (
        <section>
            <div className="container">
                <div>
                    <h3 className="text-center text-primary text-[32px] leading-[130%] lg:text-[48px] xl:text-[54px]">
                        Why <span className='text-secondary'>Bridge</span>Spero?
                    </h3>
                    <p className="text-center text-secondary mx-auto max-w-[326px] mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] lg:max-w-[351px] xxl:text-[20px]">
                        Our platform combines cutting-edge technology with proven educational methods to deliver exceptional learning experiences.
                    </p>

                </div>
                <div className='flex flex-col gap-[12px]  lg:flex-wrap lg:justify-between lg:flex-row xl:flex-row'>
                    <div className='py-[32px] px-[24px] flex flex-col items-center justify-center gap-[42px] border border-1 border-gray-light lg:w-[485px] xl:py-[46px] xl:w-[452px] xl:fill'>
                        <Image
                            width={56}
                            height={56}
                            src={'/book-open.svg'}
                            alt=''
                            className='p-[12px] border border-1 border-gray-light'
                        />
                        <div>
                            <h3 className='text-center leading-[100%] text-[28px]  xl:text-[32px]'>Quality Education</h3>
                            <p className='text-center mt-[25px] text-tertiary xl:text-[20px]'>Access to expert teachers and comprehensive courses across all subjects</p>
                        </div>

                    </div>
                    <div className='py-[32px] px-[24px] flex flex-col items-center justify-center gap-[42px] border border-1 border-gray-light lg:w-[485px] xl:py-[46px] xl:w-[452px] xl:fill'>
                        <Image
                            width={56}
                            height={56}
                            src={'/users.svg'}
                            alt=''
                            className='p-[12px] border border-1 border-gray-light'
                        />
                        <div>
                            <h3 className='text-center leading-[100%] text-[28px]  xl:text-[32px]'>Interactive Learning</h3>
                            <p className='text-center mt-[25px] text-tertiary xl:text-[20px]'>Real-time lessons, Q&A sessions, and personalized feedback</p>
                        </div>

                    </div>
                    <div className='py-[32px] px-[24px] flex flex-col items-center justify-center gap-[42px] border border-1 border-gray-light lg:w-[485px] lg:mx-auto xl:py-[46px] xl:w-[452px]'>
                        <Image
                            width={56}
                            height={56}
                            src={'/book-open.svg'}
                            alt=''
                            className='p-[12px] border border-1 border-gray-light'
                        />
                        <div>
                            <h3 className='text-center leading-[100%] text-[28px]  xl:text-[32px]'>Safe & Secure</h3>
                            <p className='text-center mt-[25px] text-tertiary xl:text-[20px]'>Protected environment with verified teachers and parental controls</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyBridgeSpero
