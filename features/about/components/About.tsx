import React from 'react'
import Link from 'next/link'

const About = () => {
    return (
        <section className="container">
            <div className="mb-[60px] lg:mb-[80px]">
                {/* Header Section */}
                <div className="flex flex-col gap-[16px] px-[20px] mb-10 mt-20 lg:w-[70%] lg:mx-auto">
                    <h1 className="text-primary text-[32px] text-center leading-[110%] lg:text-[54px]">
                        Haqqımızda
                    </h1>
                    <p className="text-secondary text-center leading-[130%] lg:text-[20px]">
                        Müəllimlərlə tələbələri birləşdirən rəqəmsal öyrənmə platforması
                    </p>
                </div>

                {/* Content Section */}
                <div className="px-[20px] lg:px-0 lg:w-[80%] lg:mx-auto">
                    <div className="space-y-8">
                        {/* Platform Overview */}
                        <div className="border-b border-gray-light pb-6">
                            <h2 className="text-primary text-[20px] lg:text-[28px] font-semibold mb-3 leading-[120%]">
                                BridgeSpero Nədir?
                            </h2>
                            <p className="text-secondary leading-[160%] text-[15px] lg:text-[18px]">
                                BridgeSpero, müəllimlərlə tələbələri bir araya gətirən, interaktiv və əlçatan təhsil təcrübəsi təqdim edən rəqəmsal öyrənmə platformasıdır. Platforma həm şəhər məktəblərində, həm də ucqar bölgələrdə yaşayan şagirdlər üçün keyfiyyətli dərslərə çıxışı asanlaşdırır.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="border-b border-gray-light pb-6">
                            <h2 className="text-primary text-[20px] lg:text-[28px] font-semibold mb-3 leading-[120%]">
                                Məqsədimiz
                            </h2>
                            <p className="text-secondary leading-[160%] text-[15px] lg:text-[18px]">
                                Platformanın əsas məqsədi — təhsil bərabərliyini təmin etmək, müəllim çatışmazlığını azaltmaq və hər bir şagirdin fərdi ehtiyaclarına uyğun öyrənmə imkanları yaratmaqdır. BridgeSpero həmçinin inklüzivlik prinsiplərinə əsaslanır və xüsusi ehtiyacı olan şagirdlər üçün daha rahat öyrənmə mühiti təqdim edir.
                            </p>
                        </div>

                        {/* Project Background */}
                        <div className="border-b border-gray-light pb-6 last:border-b-0">
                            <h2 className="text-primary text-[20px] lg:text-[28px] font-semibold mb-3 leading-[120%]">
                                Layihə Haqqında
                            </h2>
                            <p className="text-secondary leading-[160%] text-[15px] lg:text-[18px]">
                                BridgeSpero layihəsi <span className='font-bold'>Yeni Fikir LLC</span> və <span className='font-bold'>IDDA</span> tərəfindən dəstəklənir və innovativ təhsil ideyalarının inkişafına yönəlmiş <span className='font-bold'>ASSIP2</span> proqramı çərçivəsində formalaşdırılıb. Layihə müasir texnologiyalar əsasında qurularaq yerli və regional təhsil problemlərinə davamlı və ölçülə bilən həllər təqdim etməyi hədəfləyir.
                            </p>
                        </div>
                    </div>

                    {/* Footer Call to Action */}
                    <div className="mt-12 p-6 bg-gray-50 border border-gray-light">
                        <h3 className="text-primary text-[18px] lg:text-[24px] font-semibold mb-3 text-center">
                            Sualınız var?
                        </h3>
                        <p className="text-secondary text-center leading-[160%] text-[15px] lg:text-[18px] mb-4">
                            BridgeSpero haqqında daha ətraflı məlumat əldə etmək üçün bizimlə əlaqə saxlayın.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/contact"
                                className="inline-block text-[16px] lg:text-[18px] text-custom-white bg-secondary py-[12px] px-[30px] hover:opacity-90 transition-opacity"
                            >
                                Əlaqə
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
