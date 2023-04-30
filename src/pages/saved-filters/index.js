import { ShowAllSavedFilters } from '@/components/forNewsSavedFilters'
import { useAppContext, useForFetchFiltersSavedByUserFromServer } from '@/hooks'
import { useSession } from 'next-auth/react'
import React from 'react'

const SavedFilters = () => {
  const { savedFilters } = useAppContext()
  
  const {data: session} = useSession()

  useForFetchFiltersSavedByUserFromServer()
  
  const findUserSavedFilters = savedFilters.filter(item => item.user_id === session?.user?.sub)

  console.log(savedFilters, "savedFilters!!", findUserSavedFilters, findUserSavedFilters[0]?.name)
  
  return (
    <main className='min-h-screen'>
      {/* <div>SavedFilters</div> */}
      {/* <ShowAllSavedFilters data={savedFilters} /> */}
      <ShowAllSavedFilters data={findUserSavedFilters} />
    </main>
  )
}

export const getServerSidePropss = () => {
  // fetch data from server for logged in user if there is any
}

export default SavedFilters