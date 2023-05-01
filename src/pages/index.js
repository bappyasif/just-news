import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { AppHeadline, LandingPageContentRendering, PopularSearches, ReturningUserNewsSearches } from '@/components/forLandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  console.log(session?.user?.name, session)
  return (
    <main className="min-h-screen text-2xl">
      {/* <h1 className='text-4xl'>Dear {session?.user?.name || "Reader"}</h1> */}
      {/* <AppNavigation /> */}
      <AppHeadline />
      <div className='flex gap-4'>
        <LandingPageContentRendering />
        <PopularSearches />
        <ReturningUserNewsSearches />
      </div>
      {/* <AppHeadline />
      <AppIntroduction />
      <AppCTA /> */}

      {/* <AppFooter /> */}
    </main>
  )
}

const AppNavigation = () => <div>make it a dropdown</div>

// const AppHeadline = () =>  <h1>Headline goes here</h1>

const AppIntroduction = () => <div>Introduction goes here</div>

const AppCTA = () => <div>Call-To-Action goes here</div>

// const PopularSearches = () => <div>Popular search goes here</div>

// const ReturningUserNewsSearches = () => <div>News Searched goes here</div>

const AppFooter = () => <div>Footer goes here</div>