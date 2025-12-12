import PrivacyPolicy from '@/features/privacy-policy/components/PrivacyPolicy'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bridge Spero",
  description:
    "Read Bridge Spero's privacy policy to understand how we collect, use, and protect your personal information on our online learning platform.",
  keywords: "privacy policy, data protection, user privacy, Bridge Spero privacy, terms and conditions",
};

const page = () => {
    return (
        <PrivacyPolicy />
    )
}

export default page