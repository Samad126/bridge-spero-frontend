import WelcomeBack from '@/features/dashboard/teacher/welcomeBack/WelcomeBack'
import TodaysEvents from '@/features/dashboard/teacher/events/TodaysEvents'

function page() {
  return (
    <div className='container'>
      <WelcomeBack />
      <TodaysEvents />
    </div>
  )
}

export default page