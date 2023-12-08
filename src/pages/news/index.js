import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, hydrate } from '@tanstack/react-query';
import React from 'react'

const SearchNews = () => {
    const {entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters} = useMaintainUserInteractions("/forNews", "News", "NewsFilters")

    const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])

    const {routerQuery} = useForShallowQuery(setFetchData)

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/search", neutralizeVariablesAfterFetch)

    // console.log(entries, "!!", defaultFetchedData, routerQuery)

    console.log(filteredFetchedData?.data?.articles?.length || defaultFetchedData?.articles?.length, "!!!!!!!!!!whtwhwtw!!!!!!!!!", filteredFetchedData, defaultFetchedData)

    // https://newsdata.io/api/1/news?apikey=pub_188961d2328b1d5ed0e8bcf81e654ea7cdc6e&q=YOUR-QUERY&page=XXXPPPXXXXXXXXXX

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
            
            {
                showFilters
                    ? <RelatedUi entries={entries} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
                    : null
            }

{
                filteredFetchedData?.results?.length || defaultFetchedData?.results?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.articles || defaultFetchedData?.results)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input} />
                    : null
            }

            {/* {
                filteredFetchedData?.data?.articles?.length || defaultFetchedData?.articles?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.articles || defaultFetchedData?.articles)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input} />
                    : null
            } */}
        </main>
    )
}

const RelatedUi = ({ handleEntries, handleHideFilters, handleSaveSearchedFilters, entries }) => {
    const handleSearchText = e => handleEntries(e, "q")

    return (
        <ReuseableRelatedUi width={"434px"} height={"499px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
            <GetUserSearchQuery required={true} handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"not_lang"} langPref={entries?.lang} />
        </ReuseableRelatedUi>
    )
}

export const getStaticProps = () => {
    // const { queryClient } = useStaticPreFetching("search?q=Apple&countries=CA", ["news", "ca"])
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["news", "ca"],
        // queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/search?q=Apple&countries=CA`),
        // queryFn: () => fetchSourcesForDefault(`https://news-api14.p.rapidapi.com/search?q=Apple&countries=CA`),
        queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=pizza`),
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: hydrate(queryClient) || null
        }
    }
}

export default SearchNews