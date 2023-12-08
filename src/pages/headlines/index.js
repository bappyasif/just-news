import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { ChooseNewsTimePeriod, FilterToggleAndAnnouncement, GetNewsSourcesInput, NotInThisLanguage, ReuseableRelatedUi } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react'

const LatestHeadlines = () => {
  const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forHeadlines", "Headlines", "HeadlinesFilters")

  const { defaultFetchedData } = useForDefaultFetching("latest_headlines?countries=US&lang=en&topic=world&page_size=100", ["headlines", "us"])

  const { routerQuery } = useForShallowQuery(setFetchData)

  // const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || entries), "/latest_headlines", neutralizeVariablesAfterFetch)
  const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || entries), "/top-headlines", neutralizeVariablesAfterFetch)

  return (
    <main className='min-h-screen'>
      <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
      
      {
        showFilters
          ? <RelatedUi entries={entries} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
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

const RelatedUi = ({ entries, handleEntries, handleHideFilters, handleSaveSearchedFilters }) => {
  return (
    <ReuseableRelatedUi width={"434px"} height={"562px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries} langPref={entries?.not_lang}>
      <ChooseNewsTimePeriod handleTime={handleEntries} />
      <GetNewsSourcesInput handleSources={handleEntries} />
      <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"not_lang"} langPref={entries?.lang} />
    </ReuseableRelatedUi>
  )
}

export const getStaticProps = () => {
  // const { queryClient } = useStaticPreFetching("latest_headlines?countries=US&lang=en&topic=world&page_size=100", ["headlines", "us"])
  const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["headlines", "us"],
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&topic=world&page_size=100`),
        cacheTime: 86400000
    })

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default LatestHeadlines