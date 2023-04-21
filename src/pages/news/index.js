import { NotInThisLanguage, ReuseableRelatedUi, ToogleFilters, UserInput } from '@/components/shared'
import React, { useState } from 'react'

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
                    ? <RelatedUi handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
                    : null
            }
        </main>
    )
}

const RelatedUi = ({ handleEntries, handleHideFilters }) => {
    const handleSearchText = e => handleEntries(e, "searchTerm")
    return (
        <ReuseableRelatedUi width={"305px"} height={"479px"} handleHideFilters={handleHideFilters} handleEntries={handleEntries}>
            <UserInput handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
        </ReuseableRelatedUi>
    )
}

export default SearchNews