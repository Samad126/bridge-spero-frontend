const StudentNotification = () => {
    return (
        <section className="container">
            <div className='flex flex-col justify-center items-center min-h-[60vh]'>
                <h2 className='text-[32px] text-primary mt-10 mb-[24px] leading-[130%] xxl:text-[54px] xxl:mt-0'>Notifications</h2>
                <div className='flex flex-col items-center justify-center gap-[16px] p-[40px] border border-gray-light bg-gray-50 max-w-[600px]'>
                    <svg
                        className="w-[80px] h-[80px] text-secondary opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <h3 className='text-[24px] text-primary font-semibold text-center'>Coming Soon</h3>
                    <p className='text-secondary text-center leading-[160%] text-[16px] lg:text-[18px]'>
                        Student notifications feature is under development. You will be notified about lesson reminders, teacher updates, and group activities soon.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default StudentNotification
