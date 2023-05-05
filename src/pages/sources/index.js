import { RenderAllNewsSources } from '@/components/forSources';
import { FilterToggleAndAnnouncement, ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useAppContext, useFilteredDataFetching, useForDefaultFetching, useForShallowQuery, useMaintainUserInteractions, useSSGPreFetching, useStaticPreFetching } from '@/hooks';
import { makeRoutes } from '@/utils';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const NewsSources = () => {
    const { entries, fetchData, setFetchData, showFilters, neutralizeVariablesAfterFetch, handleEntries, handleHideFilters, handleToggleShowFilters, handleSaveSearchedFilters } = useMaintainUserInteractions("/forSources", "Sources", "SourcesFilters")

    const router = useRouter();

    const appCtx = useAppContext()

    const { defaultFetchedData } = useForDefaultFetching("sources?topic=business&lang=en&countries=US", ["sources", "us"])

    // const clientQuery = new QueryClient();

    // clientQuery.invalidateQueries({
    //     queryKey: ["sources", `${makeKeys(entries)}`],
    //     exact: true,
    //     // predicate: query => query.queryKey[1]
    //     predicate: Object.values(entries).length ? false : true
    // })

    // const queryClient = useQueryClient()
    // queryClient.getQueryData(["sources", `${makeKeys(entries)}`])

    // console.log(sources, entries, "!!", router.query, fetchData, appCtx.sources, makeKeys(entries))
    // console.log(sourcesRequested, "testData!!", entries, fetchData && Object.values(entries).length)

    const handleShallowRoutes = () => {
        if (Object.keys(entries).length) {
            setFetchData(true)
            router.push(`/sources?${makeRoutes(entries)}`, undefined, { shallow: true })
        }

        // setEntries({})
        handleHideFilters();
    }

    // useEffect(() => {
    //     if(Object.values(router.query).length) {
    //         setTimeout(() => {
    //             setFetchData(true)
    //         }, 1003)
    //     }
    // }, [router.query])
    const { routerQuery } = useForShallowQuery(setFetchData)

    console.log(router.query, "QUERY!!")

    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/sources")
    // const { filteredFetchedData } = useFilteredDataFetching(fetchData, ( router.query || entries), setFetchData, "/sources")
    const { filteredFetchedData } = useFilteredDataFetching(fetchData, (routerQuery || entries), "/sources", neutralizeVariablesAfterFetch)

    return (
        <main className='min-h-screen'>
            <FilterToggleAndAnnouncement showFilters={showFilters} handleHideFilters={handleHideFilters} handleToggleShowFilters={handleToggleShowFilters} />
            {/* <div
                className='flex gap-4 relative'
            >
                <ToogleFilters fromNewsSource={true} showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
                <p className='text-2xl bg-zinc-400 opacity-90 text-stone-800 font-bold w-fit px-2'>Choose Your Source Filters and Then Click Search Button From Filters Form</p>
            </div> */}

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

            {/* {
                filteredFetchedData?.data?.sources?.length || sources?.sources?.length
                    ? <RenderAllNewsSources sources={filteredFetchedData?.data?.sources || sources?.sources} filtersInUse={filteredFetchedData?.data?.user_input || sources?.user_input} />
                    : null
            } */}

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
    // const ctx = useContext()
    console.log("pre-rendeing", params, query)

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