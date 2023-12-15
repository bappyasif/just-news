import { RenderAllNewsSources } from '@/components/forSources';
import { FilterToggleAndAnnouncement, ReuseableRelatedUi } from '@/components/shared'
import { useFilteredDataFetchingForSources, useForDefaultFetchingForSources, useForSafetyKeepingOfFilters, useForShallowQuery, useMaintainUserInteractions } from '@/hooks';
import { fetchSourcesForDefault, makeRoutes } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const NewsSources = () => {
    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forSources", "Sources", "SourcesFilters")

    const router = useRouter();

    const { defaultFetchedData } = useForDefaultFetchingForSources(`sources?category=business&language=en&country=us&apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}`, ["sources", "us"])

    const handleShallowRoutes = () => {
        if (Object.keys(entries).length) {
            setFetchData(true)
            router.push(`/sources?${makeRoutes(entries)}`, undefined, { shallow: true })
        }

        handleHideFilters();
    }

    const { routerQuery } = useForShallowQuery(setFetchData)

    const {filtersUsed, isTrue, makeTruthy} = useForSafetyKeepingOfFilters(entries)

    const { filteredFetchedSourcesData } = useFilteredDataFetchingForSources(fetchData, (routerQuery || entries), "/sources", neutralizeVariablesAfterFetch)

    useEffect(() => {
        if(filteredFetchedSourcesData?.data?.results?.length) {
            makeTruthy()
        }
    }, [filteredFetchedSourcesData])

    return (
        <main className='min-h-screen'>
            {/* <h2 className="text-red-800 font-extrabold text-4xl bg-blue-600">App Is Going Through Refactoring Using New Api Source For News Data. Please wait till it gets back up in full prospect!!</h2> */}
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />

            {
                showFilters
                    ? <ReuseableRelatedUi
                        width={"434px"}
                        height={"350px"}
                        handleEntries={handleEntries}
                        handleHideFilters={handleShallowRoutes}
                        handleSaveSearchedFilters={handleSaveSearchedFilters}
                    />
                    : null
            }

            {
                filteredFetchedSourcesData?.data?.results?.length || defaultFetchedData?.results?.length
                    ? <RenderAllNewsSources sources={filteredFetchedSourcesData?.data?.results || defaultFetchedData?.results} filtersInUse={filteredFetchedSourcesData?.data?.user_input || defaultFetchedData?.user_input || (Object.keys(routerQuery).length ? routerQuery : isTrue ? filtersUsed :  {})} />
                    : null
            }
        </main>
    )
}

export const getStaticProps = (context) => {
    // query will show up when app runs in "start" mode
    // const { params, req, res, query } = context;

    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["sources", "us"],
        queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/sources?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&category=business&language=en&country=us`),
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient) || null,
        }
    }
}

export default NewsSources