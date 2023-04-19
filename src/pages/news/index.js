import { AboutLanguage, NotInThisLanguage, ReUseableJustUi, UserInput } from '@/components/shared'
import React, { useState } from 'react'

const SearchNews = () => {
    const [entries, setEntries] = useState({});
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
    console.log(entries, "!!")
    return (
        <main>
            <div>SearchNews</div>
            <RelatedUi handleEntries={handleEntries} />
        </main>
    )
}

const RelatedUi = ({handleEntries}) => {
    const handleSearchText = e => handleEntries(e, "searchTerm")
    return (
        <section>
            <UserInput handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            <ReUseableJustUi handleEntries={handleEntries} />
            {/* <NotInThisLanguage handleEntries={handleEntries} labelText={"Choose Language"} elemName={"language"} /> */}
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
        </section>
    )
}

export default SearchNews