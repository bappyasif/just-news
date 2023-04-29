import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useMaintainUserInteractions, useSSGPreFetching } from '@/hooks';
import { filterArticlesOfDuplicates } from '@/utils';
import { hydrate } from '@tanstack/react-query';
import React from 'react'

const SearchNews = () => {
    const {entries, fetchData, setFetchData, showFilters, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters} = useMaintainUserInteractions("/forNews")

    const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/search")

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
                    ? <RelatedUi handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
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

const RelatedUi = ({ handleEntries, handleHideFilters, handleSaveSearchedFilters }) => {
    const handleSearchText = e => handleEntries(e, "q")

    return (
        <ReuseableRelatedUi width={"434px"} height={"499px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries}>
            <GetUserSearchQuery handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            {/* <UserInput handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} /> */}
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"not_lang"} />
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