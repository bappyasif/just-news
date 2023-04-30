import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession()
  console.log(session?.user?.name, session)
  return (
    <main className="min-h-screen text-2xl bg-slate-400 opacity-60">
      <h1>Dear {session?.user?.name || "Reader"}</h1>
      <AppNavigation />
      <AppHeadline />
      <AppIntroduction />
      <AppCTA />
      <PopularSearches />
      <ReturningUserNewsSearches />
      <AppFooter />
    </main>
  )
}

const AppNavigation = () => <div>make it a dropdown</div>

const AppHeadline = () =>  <div>Headline goes here</div>

const AppIntroduction = () => <div>Introduction goes here</div>

const AppCTA = () => <div>Call-To-Action goes here</div>

const PopularSearches = () => <div>Popular search goes here</div>

const ReturningUserNewsSearches = () => <div>News Searched goes here</div>

const AppFooter = () => <div>Footer goes here</div>