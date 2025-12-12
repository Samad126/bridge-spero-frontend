export interface PrivacyPolicySection {
  id: number;
  title: string;
  content?: string;
  items?: string[];
  footer?: string;
  link?: {
    text: string;
    href: string;
  };
}

export const privacyPolicySections: PrivacyPolicySection[] = [
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
];

export const privacyPolicyMetadata = {
  title: "Terms and Conditions & Privacy Policy",
  subtitle: "Please read our terms and privacy policy carefully",
  lastUpdated: "December 2025"
};
