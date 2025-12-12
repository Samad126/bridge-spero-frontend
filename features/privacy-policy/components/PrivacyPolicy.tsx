import React from 'react'
import Link from 'next/link'
import { privacyPolicySections, privacyPolicyMetadata } from '../data/privacyPolicyData'

const PrivacyPolicy = () => {

    return (
        <section className="container">
            <div className="mb-[60px] lg:mb-[80px]">
                {/* Header Section */}
                <div className="flex flex-col gap-[16px] px-[20px] mb-10 mt-20 lg:w-[70%] lg:mx-auto">
                    <h1 className="text-primary text-[32px] text-center leading-[110%] lg:text-[54px] font-bold">
                        {privacyPolicyMetadata.title}
                    </h1>
                    <p className="text-secondary text-center leading-[130%] lg:text-[20px]">
                        {privacyPolicyMetadata.subtitle}
                    </p>
                    <p className="text-gray-500 text-center text-[14px] lg:text-[16px] mt-2">
                        Last Updated: {privacyPolicyMetadata.lastUpdated}
                    </p>
                </div>

                {/* Content Section */}
                <div className="px-[20px] lg:px-0 lg:w-[80%] lg:mx-auto">
                    <div className="space-y-8">
                        {privacyPolicySections.map((section) => (
                            <div
                                key={section.id}
                                className="border-b border-gray-light pb-6 last:border-b-0"
                            >
                                <h2 className="text-primary text-[20px] lg:text-[28px] font-semibold mb-3 leading-[120%]">
                                    {section.id}. {section.title}
                                </h2>

                                {section.content && (
                                    <p className="text-secondary leading-[160%] text-[15px] lg:text-[18px] mb-3">
                                        {section.content}
                                        {section.link && (
                                            <Link
                                                href={section.link.href}
                                                className="text-secondary underline hover:text-primary transition-colors"
                                            >
                                                {section.link.text}
                                            </Link>
                                        )}
                                    </p>
                                )}

                                {section.items && (
                                    <ul className="list-none space-y-2 ml-0">
                                        {section.items.map((item, index) => (
                                            <li
                                                key={index}
                                                className="text-secondary leading-[160%] text-[15px] lg:text-[18px] flex items-start"
                                            >
                                                <span className="text-secondary mr-3 mt-1 shrink-0">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.footer && (
                                    <p className="text-secondary leading-[160%] text-[15px] lg:text-[18px] mt-3 italic">
                                        {section.footer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer Call to Action */}
                    <div className="mt-12 p-6 bg-gray-50 border border-gray-light">
                        <h3 className="text-primary text-[18px] lg:text-[24px] font-semibold mb-3 text-center">
                            Questions or Concerns?
                        </h3>
                        <p className="text-secondary text-center leading-[160%] text-[15px] lg:text-[18px] mb-4">
                            If you have any questions about our Terms and Conditions or Privacy Policy, please don&apos;t hesitate to reach out.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/contact"
                                className="inline-block text-[16px] lg:text-[18px] text-custom-white bg-secondary py-[12px] px-[30px] hover:opacity-90 transition-opacity"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Acceptance Notice */}
                    <div className="mt-8 p-4 bg-blue-50 border-l-4 border-secondary">
                        <p className="text-secondary text-[14px] lg:text-[16px] leading-[150%]">
                            <strong>Important:</strong> By using BridgeSpero, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy
