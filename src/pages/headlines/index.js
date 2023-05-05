import { ShowAllArticlesData } from '@/components/forNewsArticles';
import { ChooseNewsTimePeriod, FilterToggleAndAnnouncement, GetNewsSourcesInput, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
// import { ShowAllArticlesData } from '@/components/shared/forDataRendering';
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react'

const LatestHeadlines = () => {
  const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forHeadlines", "Headlines", "HeadlinesFilters")

  const waitASecond = () => setTimeout(() => true, 1001)

  const { defaultFetchedData } = useForDefaultFetching("latest_headlines?countries=US&lang=en&topic=world&page_size=100", ["headlines", "us"])

  const { routerQuery } = useForShallowQuery(setFetchData)

  console.log(entries, "!!", routerQuery)

  const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || entries), "/latest_headlines", neutralizeVariablesAfterFetch)

  // const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/latest_headlines")

  // console.log(headlinesData, filteredFetchedData, filteredFetchedData || headlinesData)

  return (
    <main className='min-h-screen'>
      <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
      {/* <div
        className='flex gap-4 relative'
      >
        <ToogleFilters showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
        <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your Headlines Filters and Then Click Search Button From Filters Form</p>
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
  return (
    <ReuseableRelatedUi width={"434px"} height={"562px"} handleSaveSearchedFilters={handleSaveSearchedFilters} handleHideFilters={handleHideFilters} handleEntries={handleEntries}>
      <ChooseNewsTimePeriod handleTime={handleEntries} />
      <GetNewsSourcesInput handleSources={handleEntries} />
      <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"not_lang"} />
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