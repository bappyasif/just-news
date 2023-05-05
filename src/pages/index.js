import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { AppHeadline, LandingPageContentRendering, PopularSearches, ReturningUserNewsSearches, ShowAllLiveSearches } from '@/components/forLandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  console.log(session?.user?.name, session)
  return (
    <main className="min-h-screen text-2xl">
      {/* <h1 className='text-4xl'>Dear {session?.user?.name || "Reader"}</h1> */}
      {/* <AppNavigation /> */}
      <AppHeadline />
      <div className='flex xs:flex-col lg:flex-row gap-4 px-4'>
        <LandingPageContentRendering />
        <ShowAllLiveSearches />
      </div>
    </main>
  )
}