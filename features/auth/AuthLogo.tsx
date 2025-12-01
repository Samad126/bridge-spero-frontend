import Image from 'next/image'
import React from 'react'

const AuthLogo = () => {
    return (
        <div className='w-[219px] h-[36px] flex items-center justify-center mx-auto'>
            <div className="relative w-[62px] h-[36px] lg:w-[72px] lg:h-[36px]">
                <Image
                    src="/logo.svg"
                    alt="main logo"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 54px, 72px"
                />
            </div>
            <p className="font-bold text-[22px]">
                Bridge<span className="text-primary">Spero</span>
            </p>
        </div>
    )
}

export default AuthLogo
