import { ChooseNewsTimePeriod, GetNewsSourcesInput, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import React, { useState } from 'react'

const LatestHeadlines = () => {
  const [entries, setEntries] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const handleHideFilters = () => setShowFilters(false);
  const handleToggleShowFilters = () => setShowFilters(prev => !prev);
  const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
  console.log(entries, "!!")
  
  return (
    <main className=''>
      <div
        className='flex gap-4 relative'
      >
        <ToogleFilters showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
        <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your Headlines Filters and Then Click Search Button From Filters Form</p>
      </div>
      {
        showFilters
          ? <RelatedUi handleEntries={handleEntries} />
          : null
      }
    </main>
  )
}

const RelatedUi = ({ handleEntries }) => {
  return (
    <ReuseableRelatedUi width={"305px"} height={"562px"} handleEntries={handleEntries}>
        <ChooseNewsTimePeriod handleTime={handleEntries} />
        <GetNewsSourcesInput handleSources={handleEntries} />
        <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
    </ReuseableRelatedUi>
  )
}

export default LatestHeadlines