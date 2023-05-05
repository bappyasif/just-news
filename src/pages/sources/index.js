import { RenderAllNewsSources } from '@/components/forSources';
import { FilterToggleAndAnnouncement, ReuseableRelatedUi } from '@/components/shared'
import { useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions } from '@/hooks';
import { fetchSourcesForDefault, makeRoutes } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react'

const NewsSources = () => {
    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forSources", "Sources", "SourcesFilters")

    const router = useRouter();

    const { defaultFetchedData } = useForDefaultFetching("sources?topic=business&lang=en&countries=US", ["sources", "us"])

    const handleShallowRoutes = () => {
        if (Object.keys(entries).length) {
            setFetchData(true)
            router.push(`/sources?${makeRoutes(entries)}`, undefined, { shallow: true })
        }

        handleHideFilters();
    }

    const { routerQuery } = useForShallowQuery(setFetchData)

    // console.log(router.query, "QUERY!!")

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || entries), "/sources", neutralizeVariablesAfterFetch)

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />

            {
                showFilters
                    ? <ReuseableRelatedUi
                        width={"434px"}
                        height={"355px"}
                        handleEntries={handleEntries}
                        handleHideFilters={handleShallowRoutes}
                        handleSaveSearchedFilters={handleSaveSearchedFilters}
                    />
                    : null
            }

            {
                filteredFetchedData?.data?.sources?.length || defaultFetchedData?.sources?.length
                    ? <RenderAllNewsSources sources={filteredFetchedData?.data?.sources || defaultFetchedData?.sources} filtersInUse={filteredFetchedData?.data?.user_input || defaultFetchedData?.user_input} />
                    : null
            }
        </main>
    )
}

export const getStaticProps = (context) => {
    // query will show up when app runs in "start" mode
    const { params, req, res, query } = context;

    // const { queryClient } = useStaticPreFetching("sources?topic=business&lang=en&countries=US", ["sources", "us"])

    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["sources", "us"],
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US`),
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient) || null,
        }
    }
}

export default NewsSources