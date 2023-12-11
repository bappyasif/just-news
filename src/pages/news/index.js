import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useForTruthToggle, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, hydrate } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const SearchNews = () => {
    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forNews", "News", "NewsFilters")

    // const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])
    const { defaultFetchedData } = useForDefaultFetching("q=Apple&country=us&image=1&full_content=1&language=en", ["news", "ca"])

    const { routerQuery } = useForShallowQuery(setFetchData)

    console.log(entries, "entries!!")

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, (entries || routerQuery), "/news", () => null)

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/news", neutralizeVariablesAfterFetch)

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/search", neutralizeVariablesAfterFetch)

    // console.log(entries, "!!", defaultFetchedData, routerQuery)

    const {isTrue, makeFalsy, makeTruthy} =  useForTruthToggle()

    const [filtersUsed, setFiltersUsed] = useState({})

    useEffect(() => {
        Object.keys(entries).length && setFiltersUsed(entries)
        Object.keys(entries).length && makeFalsy()
    }, [entries])

    const [data, setData] = useState([])

    console.log(entries, isTrue, filtersUsed)

    useEffect(() => {
        if (filteredFetchedData?.data?.results?.length) {
            setData(filteredFetchedData?.data?.results)
            console.log("filterd fetched!!")
            makeTruthy();
        }
        // else {
        //     setData(defaultFetchedData.results)
        //     console.log(defaultFetchedData, "default fetched")
        // }
        else if (defaultFetchedData?.results?.length && !filteredFetchedData?.data?.results?.length) {
            console.log(defaultFetchedData, "default fetched")
            setData(defaultFetchedData.results)
        }
    }, [filteredFetchedData, defaultFetchedData])

    // console.log(data, "DATA!!!!", filteredFetchedData?.data)

    // console.log(filteredFetchedData?.data?.results?.length || defaultFetchedData?.articles?.length, "!!!!!!!!!!whtwhwtw!!!!!!!!!", filteredFetchedData, defaultFetchedData, filteredFetchedData?.data?.results)

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
            <h2 className="text-red-800 font-extrabold text-4xl bg-blue-600">App Is Going Through Refactoring Using New Api Source For News Data. Please wait till it gets back up in full prospect!!</h2>
            {
                showFilters
                    ? <RelatedUi entries={entries} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
                    : null
            }

            {
                data?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(data)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input || (isTrue ? filtersUsed : {})} />
                    : null
            }

            {/* {
                filteredFetchedData?.data?.results?.length 
                // || defaultFetchedData?.results?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.results || defaultFetchedData?.results)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input} />
                    : null
            } */}

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
        <ReuseableRelatedUi width={"434px"} height={"539px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
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

        queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=pizza&image=1&full_content=1&language=en`),
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: hydrate(queryClient) || null
        }
    }
}

export default SearchNews