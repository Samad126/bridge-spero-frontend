import Contact from '@/features/contact/components/Contact'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Bridge Spero",
  description:
    "Get in touch with Bridge Spero. We're here to help with any questions about our online learning platform, groups, and teachers.",
  keywords: "contact Bridge Spero, customer support, help, inquiries, online education support",
};

const page = () => {
    return (
        <Contact />
    )
}

export default page
