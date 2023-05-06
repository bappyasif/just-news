import { Inter } from 'next/font/google'
import { AppHeadline, LandingPageContentRendering, PopularSearches, ReturningUserNewsSearches, ShowAllLiveSearches } from '@/components/forLandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen text-2xl">
      <AppHeadline />
      <div className='flex xxs:flex-col lg:flex-row gap-4 px-4'>
        <LandingPageContentRendering />
        <ShowAllLiveSearches />
      </div>
    </main>
  )
}