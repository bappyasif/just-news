import { ChooseNewsTimePeriod, GetNewsSourcesInput, GetUserSearchQuery, ReUseableJustUi } from '@/components/shared'
import React, { useState } from 'react'

const LatestHeadlines = () => {
  const [entries, setEntries] = useState({});
  const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
  console.log(entries, "!!")
  return (
    <main>
      <div>LatestHeadlines</div>
      <RelatedUi handleEntries={handleEntries} />
    </main>
  )
}

const RelatedUi = ({handleEntries}) => {
  return (
    <section>
      {/* <GetUserSearchQuery /> */}
      <ChooseNewsTimePeriod handleTime={handleEntries} />
      <GetNewsSourcesInput handleSources={handleEntries} />
      <ReUseableJustUi handleEntries={handleEntries} />
    </section>
  )
}

export default LatestHeadlines