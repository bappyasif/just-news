import { ShowAllArticlesData } from '@/components/forHeadlines';
import { ChooseNewsTimePeriod, GetNewsSourcesInput, NotInThisLanguage, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useFilteredDataFetching } from '@/hooks';
import { fetchSourcesForDefault, filterArticlesOfDuplicates } from '@/utils';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const LatestHeadlines = () => {
  const [entries, setEntries] = useState({});
  const [showFilters, setShowFilters] = useState(true);
  const [fetchData, setFetchData] = useState(false);

  const handleHideFilters = () => {
    setFetchData(true);
    setShowFilters(false);
  }
  const handleToggleShowFilters = () => setShowFilters(prev => !prev);
  const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
  console.log(entries, "!!")

  const waitASecond = () => setTimeout(() => true, 1001)

  const { data: headlinesData } = useQuery({
    queryKey: ["headlines", "us"],
    queryFn: () => fetchSourcesForDefault("https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&topic=world&page_size=100"),
    // enabled: false
    onSuccess: (data) => {
      console.log(data, "!! default data!!")
    }
  })

  const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/latest_headlines")

  console.log(headlinesData, filteredFetchedData, filteredFetchedData || headlinesData)

  return (
    <main className='min-h-screen'>
      <div
        className='flex gap-4 relative'
      >
        <ToogleFilters showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
        <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your Headlines Filters and Then Click Search Button From Filters Form</p>
      </div>
      {
        showFilters
          ? <RelatedUi handleHideFilters={handleHideFilters} handleEntries={handleEntries} />
          : null
      }

      {/* {
        headlinesData?.articles?.length
          ? <ShowAllArticlesData list={filterArticlesOfDuplicates(headlinesData?.articles)} filtersUsed={headlinesData?.user_input} />
          : null
      } */}

      {
        filteredFetchedData?.data?.articles?.length || headlinesData?.articles?.length
        ? <ShowAllArticlesData list={filterArticlesOfDuplicates(filteredFetchedData?.data?.articles || headlinesData?.articles)} filtersUsed={filteredFetchedData?.data?.user_input || headlinesData?.user_input} />
          : null
      }
    </main>
  )
}

const RelatedUi = ({ handleEntries, handleHideFilters }) => {
  return (
    <ReuseableRelatedUi width={"434px"} height={"562px"} handleHideFilters={handleHideFilters} handleEntries={handleEntries}>
      <ChooseNewsTimePeriod handleTime={handleEntries} />
      <GetNewsSourcesInput handleSources={handleEntries} />
      <NotInThisLanguage handleEntries={handleEntries} labelText={"Exclude Language"} elemName={"excludeLanguage"} />
    </ReuseableRelatedUi>
  )
}

export const getStaticProps = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["headlines", "us"],
    queryFn: () => fetchSourcesForDefault("https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&topic=world&page_size=100"),
    cacheTime: 86400000
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default LatestHeadlines