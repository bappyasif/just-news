import { Inter } from 'next/font/google'
import { AppHeadline, LandingPageContentRendering, NewsCategories, PopularSearches, ReturningUserNewsSearches, ShowAllLiveSearches } from '@/components/forLandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen text-2xl">
      <AppHeadline />
      <NewsCategories />
      <div className='flex xxs:flex-col lg:flex-row gap-4 px-4 mt-4'>
        <LandingPageContentRendering />
        <ShowAllLiveSearches />
      </div>
    </main>
  )
}