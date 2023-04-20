import { ImageComponent, ReUsableImageComponent } from '@/components/navbar';
import { AboutLanguage, ChooseNewsTimePeriod, GetNewsSourcesInput, GetUserSearchQuery, NotInThisLanguage, ReUseableJustUi } from '@/components/shared'
import React, { useState } from 'react'
import filterBG from "../../../public/teamWork.jpg"

const LatestHeadlines = () => {
  const [entries, setEntries] = useState({});
  const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
  console.log(entries, "!!")
  return (
    <main className=''>
      {/* <div>LatestHeadlines</div> */}
      <RelatedUi handleEntries={handleEntries} />
      <p>Content</p>
    </main>
  )
}

const RelatedUi = ({ handleEntries }) => {
  return (
    <section
      style={{
        // height: "fit-content",
        width: "fit-content"
      }}
    >
      <ReUsableImageComponent
        height={"519px"}
        width={"310px"}
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
    </section>
  )
}

// const RelatedUi = ({ handleEntries }) => {
//   return (
//     <section
//       style={{
//         // height: "fit-content",
//         width: "310px"
//       }}
//     >
//       <div
//         className='fixed'
//         style={{
//           // minHeight: "391px",
//           height: "380px",
//           width: "319px",
//           overflow: "hidden",
//           zIndex: -1
//         }}
//       >
//         <ImageComponent
//           // height={"100%"}
//           // width={"310px"}
//           // altText={"team work picture from unsplash used here as a background"}
//           altText={"For Fill"}
//           imgSrc={filterBG}
//         />
//       </div>
//       <div className='text-xl my-2 flex flex-col gap-2'>
//         <ChooseNewsTimePeriod handleTime={handleEntries} />
//         <GetNewsSourcesInput handleSources={handleEntries} />
//         <ReUseableJustUi handleEntries={handleEntries} />
//         <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
//       </div>
//     </section>
//   )
// }

// const RelatedUi = ({ handleEntries }) => {
//   return (
//     <section className='text-2xl my-2 flex flex-col gap-2'>
//       {/* <GetUserSearchQuery /> */}
//       <div className=''>
//         <ChooseNewsTimePeriod handleTime={handleEntries} />
//         <GetNewsSourcesInput handleSources={handleEntries} />
//       </div>
//       <ReUseableJustUi handleEntries={handleEntries} />
//       {/* <NotInThisLanguage handleEntries={handleEntries} labelText={"Choose Language"} elemName={"language"} /> */}
//       <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
//     </section>
//   )
// }

export default LatestHeadlines