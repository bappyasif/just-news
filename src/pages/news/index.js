import { NotInThisLanguage, ReuseableRelatedUi, ToogleFilters, UserInput } from '@/components/shared'
import { ShowAllArticlesData } from '@/components/shared/forDataRendering';
import { useFilteredDataFetching, useForDefaultFetching, useSSGPreFetching } from '@/hooks';
import { filterArticlesOfDuplicates } from '@/utils';
import { hydrate } from '@tanstack/react-query';
import React, { useState } from 'react'

const SearchNews = () => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);

    const handleHideFilters = () => {
        setFetchData(true);
        setShowFilters(false);
    }
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);

    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/latest_headlines")

    console.log(entries, "!!", defaultFetchedData)

    return (
        <main className='min-h-screen'>
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

            {
                filteredFetchedData?.data?.articles?.length || defaultFetchedData?.articles?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.articles || defaultFetchedData?.articles)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input} />
                    : null
            }
        </main>
    )
}

const RelatedUi = ({ handleEntries, handleHideFilters }) => {
    const handleSearchText = e => handleEntries(e, "searchTerm")
    return (
        <ReuseableRelatedUi width={"434px"} height={"479px"} handleHideFilters={handleHideFilters} handleEntries={handleEntries}>
            <UserInput handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
        </ReuseableRelatedUi>
    )
}

export const getStaticProps = () => {
    const { queryClient } = useSSGPreFetching("search?q=Apple&countries=CA", ["news", "ca"])

    return {
        props: {
            dehydratedState: hydrate(queryClient) || null
        }
    }
}

export default SearchNews