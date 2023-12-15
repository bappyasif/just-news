import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetUserSearchQuery, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForSafetyKeepingOfFilters, useForShallowQuery, useForTruthToggle, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, hydrate } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const SearchNews = () => {
    const [data, setData] = useState([])


    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forNews", "News", "NewsFilters", data)

    const { routerQuery } = useForShallowQuery(setFetchData)

    const { defaultFetchedData, isLoading:defaultLoading, isError:defaultError, isSuccess:defaultSuccess } = useForDefaultFetching(`news?q=Apple&country=us&image=1&full_content=1&language=en&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`, ["news", "ca"], routerQuery)

    const { filteredFetchedData, isLoading, isError, isSuccess } = useFilteredDataFetching(fetchData, ( routerQuery || entries), "/news", neutralizeVariablesAfterFetch)

    const {filtersUsed, isTrue, makeTruthy} = useForSafetyKeepingOfFilters(entries)

    useEffect(() => {
        if (filteredFetchedData?.data?.results?.length) {
            setData(filteredFetchedData?.data?.results)
            makeTruthy();
        }

        else if (defaultFetchedData?.results?.length && !filteredFetchedData?.data?.results?.length) {
            setData(defaultFetchedData.results)
        }
    }, [filteredFetchedData, defaultFetchedData])

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
            {/* <h2 className="text-red-800 font-extrabold text-4xl bg-blue-600">App Is Going Through Refactoring Using New Api Source For News Data. Please wait till it gets back up in full prospect!!</h2> */}
            {
                showFilters
                    ? <RelatedUi entries={entries} 
                        handleSaveSearchedFilters={handleSaveSearchedFilters} 
                        handleHideFilters={handleHideFilters} 
                        handleEntries={handleEntries} 
                        />
                    : null
            }

            {
                data?.length
                    ? <ShowAllArticlesData list={filterArticlesOfDuplicates(data)} filtersUsed={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input || (Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed :  {})} nextPageRef={ filteredFetchedData?.data?.nextPage || defaultFetchedData?.nextPage} />
                    : null
            }
        </main>
    )
}

const RelatedUi = ({ handleEntries, handleHideFilters, handleSaveSearchedFilters, entries }) => {
    const handleSearchText = e => handleEntries(e, "q")

    return (
        <ReuseableRelatedUi width={"434px"} height={"450px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
            <GetUserSearchQuery required={true} handleValueChanges={handleSearchText} labelText={"Search News"} placeholderText={"Query your news term right here...."} />
        </ReuseableRelatedUi>
    )
}

export const getStaticProps = () => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["news", "ca"],
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