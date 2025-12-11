import TeacherProfile from '@/features/teacher-profile/components/TeacherProfile'
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}

async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <TeacherProfile teacherId={parseInt(id)} />
  )
}

export default page
