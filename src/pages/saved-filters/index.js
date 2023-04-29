import { ShowAllSavedFilters } from '@/components/forNewsSavedFilters'
import { useAppContext } from '@/hooks'
import React from 'react'

const SavedFilters = () => {
  const { savedFilters } = useAppContext()
  console.log(savedFilters, "savedFilters!!")
  return (
    <main className='min-h-screen'>
      <div>SavedFilters</div>
      <ShowAllSavedFilters data={savedFilters} />
    </main>
  )
}

export const getServerSidePropss = () => {
  // fetch data from server for logged in user if there is any
}

export default SavedFilters