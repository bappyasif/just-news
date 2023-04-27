import { RenderAllNewsSources } from '@/components/forSources';
import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useAppContext, useFilteredDataFetching, useForDefaultFetching, useMaintainUserInteractions, useSSGPreFetching } from '@/hooks';
import { makeRoutes } from '@/utils';
import { dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const NewsSources = () => {
    const {entries, fetchData, setFetchData, showFilters, handleEntries, handleHideFilters, handleToggleShowFilters} = useMaintainUserInteractions()

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
            router.push(`/sources${makeRoutes(entries)}`, undefined, { shallow: true })
        }

        // setEntries({})
        handleHideFilters();
    }

    const { filteredFetchedData } = useFilteredDataFetching(fetchData, entries, setFetchData, "/sources")

    return (
        <main>
            <div
                className='flex gap-4 relative'
            >
                <ToogleFilters fromNewsSource={true} showFilters={showFilters} handleToggleShowFilters={handleToggleShowFilters} handleHideFilters={handleHideFilters} />
                <p className='text-2xl bg-zinc-400 opacity-90 text-sky-600 w-fit px-2'>Choose Your Source Filters and Then Click Search Button From Filters Form</p>
            </div>

            {
                showFilters
                    ? <ReuseableRelatedUi
                        width={"434px"}
                        height={"355px"}
                        handleEntries={handleEntries}
                        handleHideFilters={handleShallowRoutes}
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

    const { queryClient } = useSSGPreFetching("sources?topic=business&lang=en&countries=US", ["sources", "us"])

    return {
        props: {
            dehydratedState: dehydrate(queryClient) || null,
        }
    }
}

export default NewsSources