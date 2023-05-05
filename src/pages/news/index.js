import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, hydrate } from '@tanstack/react-query';
import React from 'react'

const SearchNews = () => {
    const {entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters} = useMaintainUserInteractions("/forNews", "News", "NewsFilters")

    const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])

    const {routerQuery} = useForShallowQuery(setFetchData)

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/search", neutralizeVariablesAfterFetch)

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/search")

    console.log(entries, "!!", defaultFetchedData, routerQuery)

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
            {/* <div
                className='flex gap-4 relative'
            >
                <ToogleFilters fromNewsSearch={true} showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
                <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your News Filters and Then Click Search Button From Filters Form</p>
            </div> */}
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
    // const { queryClient } = useStaticPreFetching("search?q=Apple&countries=CA", ["news", "ca"])
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["news", "ca"],
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/search?q=Apple&countries=CA`),
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: hydrate(queryClient) || null
        }
    }
}

export default SearchNews