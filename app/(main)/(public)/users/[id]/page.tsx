import StudentProfile from '@/features/student-profile/components/StudentProfile'
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}

async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <StudentProfile userId={parseInt(id)} />
  )
}

export default page
