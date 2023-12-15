import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { FilterToggleAndAnnouncement, GetNewsSourcesInput, HeadlinesTimeframe, ReuseableRelatedUi } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForSafetyKeepingOfFilters, useForShallowQuery, useMaintainUserInteractions } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import React, { useEffect } from 'react'

const LatestHeadlines = () => {
  const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forHeadlines", "Headlines", "HeadlinesFilters")

  const { routerQuery } = useForShallowQuery(setFetchData)

  const { defaultFetchedData } = useForDefaultFetching(`news?country=us&language=en&category=world&timeframe=12&image=1&full_content=1&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`, ["headlines", "us"], routerQuery)

  const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || { prioritydomain: 'top', timeframe: 6, ...entries }), "/news", neutralizeVariablesAfterFetch)

  const { filtersUsed, isTrue, makeTruthy } = useForSafetyKeepingOfFilters(entries)

  useEffect(() => {
    filteredFetchedData?.data?.results?.length && makeTruthy()
  }, [filteredFetchedData?.data?.results])

  return (
    <main className='min-h-screen'>
      {/* <h2 className="text-red-800 font-extrabold text-4xl bg-blue-600">App Is Going Through Refactoring Using New Api Source For News Data. Please wait till it gets back up in full prospect!!</h2> */}

      <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />

      {
        showFilters
          ? <RelatedUi entries={entries} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
          : null
      }

      {
        filteredFetchedData?.data?.results?.length || defaultFetchedData?.results?.length
          ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.results || defaultFetchedData?.results)} filtersUsed={filteredFetchedData?.data?.user_input || (Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed :  null)} nextPageRef={ filteredFetchedData?.data?.nextPage || defaultFetchedData?.nextPage} />
          : null
      }
    </main>
  )
}

const RelatedUi = ({ entries, handleEntries, handleHideFilters, handleSaveSearchedFilters }) => {
  return (
    <ReuseableRelatedUi width={"434px"} height={"519px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
      <HeadlinesTimeframe handleSources={handleEntries} />
      <GetNewsSourcesInput handleSources={handleEntries} />
    </ReuseableRelatedUi>
  )
}

export const getStaticProps = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["headlines", "us"],
    queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&country=us&language=en&category=world&timeframe=12&prioritydomain=top&image=1&full_content=1`),
    cacheTime: 86400000
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default LatestHeadlines