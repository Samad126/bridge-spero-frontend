// import React from 'react'
import WelcomeBack from '@/features/dashboard/teacher/welcomeBack/WelcomeBack'
import TodaysEvents from '@/features/dashboard/teacher/events/TodaysEvents'
// import EventCard from '@/features/dashboard/teacher/events/EventCard'

function page() {
  return (
    // <div className='relative'>
    //   <div className='absolute top-0'>Salam olsun hamiya</div>
    // </div>
    // <p>Salam</p>
    <div className='container'>
      <WelcomeBack />
      <TodaysEvents />
      {/* <EventCard/> */}
    </div>
  )
}

export default page