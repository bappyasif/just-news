import { ImageComponent, ReUsableImageComponent } from '@/components/navbar';
import { AboutLanguage, ChooseNewsTimePeriod, GetNewsSourcesInput, GetUserSearchQuery, NotInThisLanguage, ReUseableJustUi } from '@/components/shared'
import React, { useState } from 'react'
import filterBG from "../../../public/teamWork.jpg"
import filterIcon from "../../../public/newspapersPile.jpg"
import { MdFilter3, MdFilter5, MdFilter6, MdFilter7 } from 'react-icons/md';

const LatestHeadlines = () => {
  const [entries, setEntries] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const handleHideFilters = () => setShowFilters(false);
  const handleToggleShowFilters = () => setShowFilters(prev => !prev);
  const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
  console.log(entries, "!!")
  
  return (
    <main className=''>
      {/* <div>LatestHeadlines</div> */}
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

export const ToogleFilters = ({ fromNewsSource,  fromNewsSearch,  showFilters, handleHideFilters, handleToggleShowFilters }) => {
  return (
    <div
      className='text-center text-2xl text-zinc-200'
      style={{ width: "184px" }}
      onClick={handleToggleShowFilters}
    >
      <ReUsableImageComponent
        height={"31px"}
        width={"184px"}
        // altText={"team work picture from unsplash used here as a background"}
        altText={"For Fill"}
        imgSrc={filterIcon}
      />
      <div className='flex gap-2 items-center justify-between' style={{padding: "0 4px !important"}}>
        <span className=''> {showFilters ? "Hide" : "Show"} Filters</span>
        {fromNewsSearch ? <MdFilter5 /> : fromNewsSource ? <MdFilter3 /> : <MdFilter7 />}
      </div>

    </div>
  )
}

const RelatedUi = ({ handleEntries }) => {
  return (
    <section
      className='absolute px-2 mt-2'
      style={{
        // height: "fit-content",
        width: "fit-content"
      }}
    >
      <ReUsableImageComponent
        height={"562px"}
        width={"305px"}
        // altText={"team work picture from unsplash used here as a background"}
        altText={"For Fill"}
        imgSrc={filterBG}
      />
      <div className='text-xl my-2 flex flex-col gap-2'>
        <p className='text-cyan-400 font-extrabold text-center'>Select Your Filters Here</p>
        <ChooseNewsTimePeriod handleTime={handleEntries} />
        <GetNewsSourcesInput handleSources={handleEntries} />
        <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
        <ReUseableJustUi handleEntries={handleEntries} />
      </div>
      <button className='bg-cyan-400 w-full rounded-md mt-4 text-2xl'>Search Now</button>
    </section>
  )
}

export default LatestHeadlines