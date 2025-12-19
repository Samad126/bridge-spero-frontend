import TeacherProfile from '@/features/teacher-profile/components/TeacherProfile'
import React from 'react'
import { cookies } from 'next/headers'

interface PageProps {
  params: Promise<{ id: string }>;
}

async function page({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');
  const isAuthenticated = !!(accessToken || refreshToken);

  return (
    <TeacherProfile teacherId={parseInt(id)} isAuthenticated={isAuthenticated} />
  )
}

export default page
