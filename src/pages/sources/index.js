import { RenderAllNewsSources } from '@/components/forSources';
import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useAppContext } from '@/hooks';
import { makeKeys, makeRoutes, newsApiRequestInterceptor } from '@/utils';
import { QueryClient, dehydrate, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const fetchSourcesForDefault = () => fetch("https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US",
    { headers: { 'x-api-key': process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY } })
    .then(resp => resp.json()).then(d => d)

const fetchSourcesOnRequests = (options) => newsApiRequestInterceptor(options).then(data => data)

const NewsSources = () => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);
    // const [sourcesData, setSourcesData] = useState({})

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const router = useRouter();

    const appCtx = useAppContext()

    const { data: sources } = useQuery({
        queryKey: ["sources", "us"],
        queryFn: fetchSourcesForDefault,
        onSuccess: (data) => {
            console.log(data, "!!data!!", appCtx.sources)
        }
    })

    // const clientQuery = new QueryClient();

    // clientQuery.invalidateQueries({
    //     queryKey: ["sources", `${makeKeys(entries)}`],
    //     exact: true,
    //     // predicate: query => query.queryKey[1]
    //     predicate: Object.values(entries).length ? false : true
    // })

    // const {data: testData} = useQuery({
    //     queryKey: ["sources", `${makeKeys(entries)}`],
    //     queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    //     // enabled: fetchData && makeKeys(entries).length ? false : true,
    //     enabled: fetchData && Object.values(entries).length ? true : false,
    //     refetchOnWindowFocus: false,
    //     onSuccess: (data) => {
    //         console.log(data, "!!data!!", appCtx.sources, `${makeKeys(entries)}`, Object.keys(entries).length)
    //         setFetchData(false);
    //         setEntries({})
    //     }
    // })

    const makeRequest = () => {
        const method = "GET"
        const url = "/sources"
        const params = { ...entries }
        const headers = { 'x-api-key': process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY }
        console.log(url, params, headers)
        return fetchSourcesOnRequests({ method, url, params, headers })
    }

    const { data: sourcesRequested } = useQuery({
        queryKey: ["sources", `${makeKeys(entries)}`],
        queryFn: makeRequest,
        enabled: fetchData && Object.values(entries).length ? true : false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log(data, "!!data!!", appCtx.sources, `${makeKeys(entries)}`, Object.keys(entries).length)
            setFetchData(false);
            setEntries({})
        },
        cacheTime: 86400000
    })

    // const queryClient = useQueryClient()

    // const { data: testData } = useQuery({
    //     queryKey: ["sources", `${makeKeys(entries)}`],
    //     queryFn: makeRequest,
    //     // enabled: fetchData && makeKeys(entries).length ? false : true,
    //     enabled: fetchData && Object.values(entries).length ? true : false,
    //     refetchOnWindowFocus: false,
    //     initialData: () => {
    //         console.log(queryClient.getQueryData(["sources", `${makeKeys(entries)}`]), "cahced data")
    //         return queryClient.getQueryData(["sources", `${makeKeys(entries)}`])
    //     },
    //     onSuccess: (data) => {
    //         console.log(data, "!!data!!", appCtx.sources, `${makeKeys(entries)}`, Object.keys(entries).length)
    //         setFetchData(false);
    //         setEntries({})
    //     },
    //     cacheTime: 86400000
    // })

    // const updateNewsSourcesDataset = () => {
    //     if (sourcesRequested?.data?.sources) {
    //         setSourcesData(sourcesRequested.data)
    //     } else if (sources?.sources) {
    //         setSourcesData(sources)
    //     }
    //     // console.log(sourcesRequested?.data?.sources, sources.sources, sourcesRequested?.data?.sources || sources.sources)
    //     console.log(sourcesData, "sourcesData!!")
    // }

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

    // useEffect(() => {
    //     updateNewsSourcesDataset()
    // }, [sources, sourcesRequested])

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
                fetchData || sources?.sources?.length
                    // ? <RenderAllNewsSources sources={sourcesData?.sources || sources?.sources} filtersInUse={sourcesData?.user_input || sources?.user_input} />
                    ? <RenderAllNewsSources sources={ sourcesRequested?.data?.sources || sources?.sources} filtersInUse={ sourcesRequested?.data?.user_input || sources?.user_input} />
                    : null
            } */}

            {
                sourcesRequested?.data?.sources?.length || sources?.sources?.length
                    ? <RenderAllNewsSources sources={sourcesRequested?.data?.sources || sources?.sources} filtersInUse={sourcesRequested?.data?.user_input || sources?.user_input} />
                    : null
            }

        </main>
    )
}

export const getStaticProps = async (context) => {
    // query will show up when app runs in "start" mode
    const { params, req, res, query } = context;
    // const ctx = useContext()
    console.log("pre-rendeing", params, query)

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["sources", "us"],
        queryFn: fetchSourcesForDefault,
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default NewsSources