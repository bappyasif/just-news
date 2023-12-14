import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForSafetyKeepingOfFilters, useForShallowQuery, useForTruthToggle, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, hydrate } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const SearchNews = () => {
    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forNews", "News", "NewsFilters")

    const { routerQuery } = useForShallowQuery(setFetchData)

    // const { defaultFetchedData } = useForDefaultFetching("search?q=Apple&countries=CA", ["news", "ca"])
    // const { defaultFetchedData } = useForDefaultFetching("q=Apple&country=us&image=1&full_content=1&language=en", ["news", "ca"])
    // const { defaultFetchedData } = useForDefaultFetching(`news?q=Apple&country=us&image=1&full_content=1&language=en&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`, ["news", "ca"])
    const { defaultFetchedData, isLoading:defaultLoading, isError:defaultError, isSuccess:defaultSuccess } = useForDefaultFetching(`news?q=Apple&country=us&image=1&full_content=1&language=en&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`, ["news", "ca"], routerQuery)

    // const { routerQuery } = useForShallowQuery(setFetchData)

    // console.log(entries, "entries!!")

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, (entries || routerQuery), "/news", () => null)

    const { filteredFetchedData, isLoading, isError, isSuccess } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/news", neutralizeVariablesAfterFetch)

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/search", neutralizeVariablesAfterFetch)

    // console.log(entries, "!!", defaultFetchedData, routerQuery)

    // const {isTrue, makeFalsy, makeTruthy} =  useForTruthToggle()

    // const [filtersUsed, setFiltersUsed] = useState({})

    // useEffect(() => {
    //     Object.keys(entries).length && setFiltersUsed(entries)
    //     Object.keys(entries).length && makeFalsy()
    // }, [entries])

    const {filtersUsed, isTrue, makeTruthy} = useForSafetyKeepingOfFilters(entries)

    const [data, setData] = useState([])

    console.log(entries, isTrue, filtersUsed)

    useEffect(() => {
        if (filteredFetchedData?.data?.results?.length) {
            setData(filteredFetchedData?.data?.results)
            // console.log("filterd fetched!!")
            makeTruthy();
        }
        // else {
        //     setData(defaultFetchedData.results)
        //     console.log(defaultFetchedData, "default fetched")
        // }
        else if (defaultFetchedData?.results?.length && !filteredFetchedData?.data?.results?.length) {
            // console.log(defaultFetchedData, "default fetched")
            setData(defaultFetchedData.results)
        }
    }, [filteredFetchedData, defaultFetchedData])

    // useEffect(() => {
    //     if(isTrue && defaultFetchedData?.results?.length) {
    //         alert("showing data!!")
    //     } else {
    //         setTimeout(() => {
    //             console.log(filteredFetchedData?.data?.results?.length, "fn!!")
    //             !filteredFetchedData?.data?.results?.length && alert("found nothing!!")
    //             // !isTrue && Object.keys(routerQuery).length && !defaultFetchedData?.results?.length && alert("found nothing!!")
    //         }, 6000)
    //         // !isTrue && Object.keys(routerQuery).length && !defaultFetchedData?.results?.length && setTimeout(() => {
    //         //     !defaultFetchedData?.results?.length && alert("found nothing!!")
    //         // }, 4000)
    //     }
    //     // isTrue && defaultFetchedData?.results?.length && alert("showing data!!")
    //     // !isTrue && Object.keys(routerQuery).length && !defaultFetchedData?.results?.length && setTimeout(() => {
    //     //     !data.length && alert("found nothing!!")
    //     // }, 4000)
    // }, [isTrue, routerQuery])

    // console.log(data, "DATA!!!!", filteredFetchedData?.data, filtersUsed, !isTrue && Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed : null)

    // useForAlertingUserWhenFetchFoundNothing(isTrue ? filtersUsed : !isTrue && Object.keys(routerQuery).length ? routerQuery : {}, filteredFetchedData?.data?.results)

    // useForAlertingUserWhenFetchFoundNothing(!isTrue && Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed :  {}, filteredFetchedData?.data?.results)

    // useEffect(() => {
    //     setTimeout(() => {
    //         Object.keys(filtersUsed).length && !filteredFetchedData?.data?.results?.length && alert("found nothing!! try a different option maybe?! thanks :)")
    //     }, 4000)
    // }, [filtersUsed])

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
                defaultLoading
                ? <h2 className='font-bold text-red-600 text-2xl'>Default data is loading....</h2>
                : defaultError
                ? <h2 className='font-bold text-red-600 text-2xl'>Default data fetching failed!!</h2>
                : isLoading
                ? <h2 className='font-bold text-blue-600 text-2xl'>Filtered data is loading....</h2>
                : isError
                ? <h2 className='font-bold text-blue-600 text-2xl'>Filtered data fetching failed!!</h2>
                : isSuccess
                ? <h2 className='font-bold text-blue-600 text-2xl'>Filtered data loaded successfully....</h2>
                : null
            }

            {
                data?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(data)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input || (Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed :  {})} nextPageRef={ filteredFetchedData?.data?.nextPage || defaultFetchedData?.nextPage} />
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
        <ReuseableRelatedUi width={"434px"} height={"499px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
            <GetUserSearchQuery required={true} handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
            {/* <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"not_lang"} langPref={entries?.lang} /> */}
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