import { ShowAllSavedFilters } from '@/components/forNewsSavedFilters'
import { navs } from '@/data'
import { useAppContext, useForFetchFiltersSavedByUserFromServer } from '@/hooks'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const SavedFilters = () => {
  const { savedFilters } = useAppContext()

  const { data: session } = useSession()

  useForFetchFiltersSavedByUserFromServer()

  const findUserSavedFilters = savedFilters.filter(item => item.user_id === session?.user?.sub)

  return (
    <main className='min-h-screen'>
      {
        session
          ? <ShowAllSavedFilters data={findUserSavedFilters} />
          : <PromptUserForLogin />
      }

    </main>
  )
}

const PromptUserForLogin = () => {
  const renderLinks = () => navs.map(item => {
    return (
      item.name !== "Home"
        ?
        <Link 
          className='flex gap-4 items-center bg-slate-600 text-slate-200 px-4 rounded-md m-1 max-w-fit'
          href={item.path}
        >
          <span>{item.name}</span>
          <span>{item.icon}</span>
        </Link>
        : null
    )
  })

  return (
    <div
      className='bg-neutral-800 opacity-90 p-4 text-4xl text-slate-400 flex flex-col gap-4 min-w-max'
    >
      <h2>You Are Not Currently Logged In!! Ready To <button className='bg-blue-400 text-slate-700 px-6 rounded-lg' onClick={() => signIn()}>Login?</button></h2>
      <h3>You Need to Be Logged In To See Your Saved Filters</h3>
      <h3>You Can Save Filters By Using Filters Modals From These Pages</h3>
      <div className=''>
        {renderLinks()}
      </div>
    </div>
  )
}

// export const getServerSideProps = () => {
//   // fetch data from server for logged in user if there is any
// }

export default SavedFilters