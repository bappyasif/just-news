import { SelectLanguage } from '@/components/forSources'
import { ChooseIfMultipleCountries, MultipleCountriesHandleInputs, ReUseableJustUi, RenderAllAvailableLanguages, RenderAllPublishingCountries, ShowTopics } from '@/components/shared'
import React, { useState } from 'react'
import { ToogleFilters } from '../headlines';
import filterBG from "../../../public/teamWork.jpg"
import { ReUsableImageComponent } from '@/components/navbar';

const NewsSources = () => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
    console.log(entries, "!!")

    return (
        <main>
            <div
                className='flex gap-4 relative'
            >
                <ToogleFilters fromNewsSource={true} showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
                <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your News Filters and Then Click Search Button From Filters Form</p>
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
        <section
            className='absolute px-2 mt-2'
            style={{
                // height: "fit-content",
                width: "fit-content"
            }}
        >
            <ReUsableImageComponent
                height={"355px"}
                width={"301px"}
                // altText={"team work picture from unsplash used here as a background"}
                altText={"For Fill"}
                imgSrc={filterBG}
            />
            <div className='text-xl my-2 flex flex-col gap-2' style={{width: "301px"}}>
                <p className='text-cyan-400 font-extrabold text-center'>Select Your Filters Here</p>
                <ReUseableJustUi handleEntries={handleEntries} />
            </div>
            <button className='bg-cyan-400 w-full rounded-md mt-5 text-2xl'>Search Now</button>
        </section>
    )
}

// const JustUi = ({handleEntries}) => {
//     const [multiple, setMultiple] = useState("Single")
//     const handleIfMultiples = evt => setMultiple(evt.target.value)

//     return (
//         <section>
//             <RenderAllAvailableLanguages />
//             <ChooseIfMultipleCountries handleChange={handleIfMultiples} />
//             {
//                 multiple === "Multiple"
//                 ? <MultipleCountriesHandleInputs handleChanges={handleEntries} />
//                 : <RenderAllPublishingCountries handleCountries={handleEntries} />
//             }
//             <ShowTopics handleTopics={handleEntries} />
//         </section>
//     )
// }

export default NewsSources