import { useAppContext } from '@/hooks'
import React from 'react'

const SavedFilters = () => {
    const {savedFilters} = useAppContext()
    console.log(savedFilters, "savedFilters!!")
  return (
    <div>SavedFilters</div>
  )
}

export const getServerSidePropss = () => {
    // fetch data from server
}

export default SavedFilters