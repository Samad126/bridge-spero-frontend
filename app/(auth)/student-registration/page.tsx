import StudentRegistration from '@/features/auth/student-registration/StudentRegistration'

export const metadata = {
    title: "Student Registration | Bridge Spero",
    description: "Student Registration to Bridge Spero",
};

const page = () => {
    return (
        <StudentRegistration />
    )
}

export default page
