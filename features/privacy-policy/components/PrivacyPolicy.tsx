import React from 'react'
import Link from 'next/link'

const PrivacyPolicy = () => {
    const sections = [
        {
            id: 1,
            title: "Introduction",
            content: "Welcome to BridgeSpero, an online educational platform designed to connect teachers and students for interactive learning. By using our platform, you agree to the following Terms and Conditions and Privacy Policy. Please read them carefully."
        },
        {
            id: 2,
            title: "Platform Purpose",
            content: "BridgeSpero provides tools for teachers to create profiles, publish courses, host live classes, and share educational materials. Students can browse available courses, enroll, attend live sessions, and access learning resources."
        },
        {
            id: 3,
            title: "User Accounts",
            items: [
                "Users must provide accurate and complete information during registration.",
                "Users are responsible for keeping their login details confidential.",
                "BridgeSpero reserves the right to suspend accounts that violate our policies."
            ]
        },
        {
            id: 4,
            title: "Student Responsibilities",
            items: [
                "Students must use the platform respectfully and follow class rules set by teachers.",
                "Students must not share paid course materials externally.",
                "Students must not misuse communication tools or disturb live classes."
            ]
        },
        {
            id: 5,
            title: "Teacher Responsibilities",
            items: [
                "Teachers must provide accurate course descriptions.",
                "Teachers must ensure the content they upload does not violate copyright laws.",
                "Teachers are responsible for managing scheduling and responding to student inquiries."
            ]
        },
        {
            id: 6,
            title: "Payments (Temporary Card-to-Card System)",
            items: [
                "Payments between students and teachers currently occur through direct card-to-card transfer.",
                "BridgeSpero does not store card details and is not responsible for payment disputes.",
                "After payment is confirmed, the student gains access to the course.",
                "Users must keep payment receipts for verification."
            ]
        },
        {
            id: 7,
            title: "Refunds",
            items: [
                "Refunds are handled directly between the student and teacher.",
                "BridgeSpero may review disputes but does not guarantee refunds."
            ]
        },
        {
            id: 8,
            title: "Prohibited Activities",
            content: "Users must not:",
            items: [
                "Upload harmful or illegal content.",
                "Engage in harassment, discrimination, or inappropriate behavior.",
                "Attempt to hack or manipulate platform systems."
            ]
        },
        {
            id: 9,
            title: "Data Collection",
            content: "We collect:",
            items: [
                "Basic user information (name, email, phone number)",
                "Course activity data",
                "Communication logs with teachers"
            ],
            footer: "This information is used to improve platform features and security."
        },
        {
            id: 10,
            title: "Data Protection",
            items: [
                "We do not sell user information to third parties.",
                "We implement security measures to protect account data.",
                "Users may request deletion of their account and associated data."
            ]
        },
        {
            id: 11,
            title: "Third-Party Services",
            content: "BridgeSpero may integrate external tools (video conferencing, analytics, etc.). These services have their own policies."
        },
        {
            id: 12,
            title: "Intellectual Property",
            content: "All content uploaded by teachers remains their property. BridgeSpero owns the platform design, brand, and technical infrastructure."
        },
        {
            id: 13,
            title: "Termination",
            content: "We may suspend or terminate accounts that violate policies or engage in harmful activities."
        },
        {
            id: 14,
            title: "Policy Updates",
            content: "BridgeSpero may update these terms. Users will be notified of major changes."
        },
        {
            id: 15,
            title: "Contact Information",
            content: "For concerns or inquiries, contact: ",
            link: {
                text: "support@bridgespero.com",
                href: "mailto:support@bridgespero.com"
            }
        }
    ]

    return (
        <section className="container">
            <div className="mb-[60px] lg:mb-[80px]">
                {/* Header Section */}
                <div className="flex flex-col gap-[16px] px-[20px] mb-10 mt-20 lg:w-[70%] lg:mx-auto">
                    <h1 className="text-primary text-[32px] text-center leading-[110%] lg:text-[54px] font-bold">
                        Terms and Conditions & Privacy Policy
                    </h1>
                    <p className="text-secondary text-center leading-[130%] lg:text-[20px]">
                        Please read our terms and privacy policy carefully
                    </p>
                    <p className="text-gray-500 text-center text-[14px] lg:text-[16px] mt-2">
                        Last Updated: December 2024
                    </p>
                </div>

                {/* Content Section */}
                <div className="px-[20px] lg:px-0 lg:w-[80%] lg:mx-auto">
                    <div className="space-y-8">
                        {sections.map((section) => (
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
