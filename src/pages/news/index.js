import { ReUsableImageComponent } from '@/components/navbar';
import { AboutLanguage, NotInThisLanguage, ReUseableJustUi, UserInput } from '@/components/shared'
import React, { useState } from 'react'
import filterBG from "../../../public/teamWork.jpg"
import { ToogleFilters } from '../headlines';

const SearchNews = () => {
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
                <ToogleFilters fromNewsSearch={true} showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
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
    const handleSearchText = e => handleEntries(e, "searchTerm")
    return (
        <section
            className='absolute px-2 mt-2'
            style={{
                width: "fit-content"
            }}
        >
            <ReUsableImageComponent
                height={"434px"}
                width={"305px"}
                // altText={"team work picture from unsplash used here as a background"}
                altText={"For Fill"}
                imgSrc={filterBG}
            />
            <div
                className='text-xl my-2 flex flex-col gap-2'
            >
                <UserInput handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
                <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
                <ReUseableJustUi handleEntries={handleEntries} />
                {/* <NotInThisLanguage handleEntries={handleEntries} labelText={"Choose Language"} elemName={"language"} /> */}
            </div>
            <button className='bg-cyan-400 w-full rounded-md mt-4 text-2xl'>Search Now</button>
        </section>
    )
}

export default SearchNews