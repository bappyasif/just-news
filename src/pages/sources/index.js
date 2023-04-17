import { SelectLanguage } from '@/components/forSources'
import { ChooseIfMultipleCountries, MultipleCountriesHandleInputs, RenderAllAvailableLanguages, RenderAllPublishingCountries, ShowTopics } from '@/components/shared'
import React, { useState } from 'react'

const NewsSources = () => {
    const [entries, setEntries] = useState({});
    const handleEntries = (evt, elem) => setEntries(prev => ({...prev, [elem]: evt.target.value}))
    console.log(entries, "!!")
    return (
        <main>
            <div>NewsSources</div>
            {/* <SelectLanguage /> */}
            <JustUi handleEntries={handleEntries} />
    </main>
    )
}

const JustUi = ({handleEntries}) => {
    const [multiple, setMultiple] = useState("Single")
    const handleIfMultiples = evt => setMultiple(evt.target.value)

    return (
        <section>
            <RenderAllAvailableLanguages />
            <ChooseIfMultipleCountries handleChange={handleIfMultiples} />
            {
                multiple === "Multiple"
                ? <MultipleCountriesHandleInputs handleChanges={handleEntries} />
                : <RenderAllPublishingCountries handleCountries={handleEntries} />
            }
            <ShowTopics handleTopics={handleEntries} />
        </section>
    )
}

export default NewsSources