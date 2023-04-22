import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

// const fetchSources = () => fetch("https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US", {headers: {'x-api-key': 'L2auYD6LCiCr0xDqxJKH8o1HPib8kJq_2EJUGwy_i8o'}}).then(resp => resp.json()).then(data =>data)
const fetchSources = () => fetch("https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US", {headers: {'x-api-key': 'L2auYD6LCiCr0xDqxJKH8o1HPib8kJq_2EJUGwy_i8o'}})

const NewsSources = ({ dehydratedState }) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const queryClient = new QueryClient()

    const state = queryClient.getQueryState(["sources", "us"])
    
    // const result = useQuery({
    //     queryKey: ["sources", "us"],
    //     queryFn: fetchSources,
    //     // enabled: () => {
    //     //     const state = queryClient.getQueryState(["sources", "us"])
    //     //     // return (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) ? false : true
    //     //     return (state && Date.now() - state.dataUpdatedAt) <= 10 * 1000
    //     // },
    //     // enabled: Date.now() < 86400000,
    //     // enabled: () => {
    //     //     const state = queryClient.getQueryState(["sources", "us"])

    //     //     console.log(state, "enabled - state data!!", Date.now() < 86400000, Date.now(), 86400000, dehydratedState)

    //     //     return false
    //     // },
    //     enabled: false,
    //     initialData: () => {
    //         // Get the query state
    //         const state = queryClient.getQueryState(["sources", "us"])

    //         console.log(state, "outside - state data!!")

    //         // If the query exists and has data that is no older than 10 seconds...
    //         if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
    //             console.log(state, "if block - state data!!")
    //             return state.data
    //             // return the individual todo
    //             // return state.data.find((d) => d.id === todoId)
    //         }

    //         // Otherwise, return undefined and let it fetch from a hard loading state!
    //     },
    //     initialDataUpdatedAt: () => queryClient.getQueryState(["sources", "us"])?.dataUpdatedAt
    // })

    const router = useRouter();

    // console.log(entries, "!!", test, data?.length, router.query, fetchData, posts?.length, dehydratedState?.data?.data?.length, dehydratedState?.queries[0]?.state?.data?.length)
    // console.log(entries, "!!", test, data?.length, router.query, fetchData, posts?.length, dehydratedState?.data?.data?.length)
    // console.log(result.data, entries, "!!", router.query, fetchData, dehydratedState?.data?.data?.length)
    console.log( state, entries, "!!", router.query, fetchData, dehydratedState?.data?.data?.length)

    const makeRoutes = () => {
        let str = '';
        for (let key in entries) {
            if (entries[key]) {
                str += `?${key}=${entries[key]}`
            }
        }
        return str
    }

    const handleShallowRoutes = () => {
        if (Object.keys(entries).length) {
            handleHideFilters();
            setFetchData(true)
            router.push(`/sources${makeRoutes()}`, undefined, { shallow: true })
        }
    }

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
                        width={"274px"}
                        height={"355px"}
                        handleEntries={handleEntries}
                        handleHideFilters={handleShallowRoutes}
                    />
                    : null
            }

            {fetchData ? "Fetch and Render Data" : null}

        </main>
    )
}

export const getServerSideProps = async (context) => {
    // query will show up when app runs in "start" mode
    const { params, req, res, query } = context;

    // just change  axios.get(url) to axios.get(url).then(res=>res.data)
    // const fetchPosts = () => fetch("https://jsonplaceholder.typicode.com/posts").then(resp => resp.json()).then(data => data)
    // as data needs to be serializable, thats why sending data back as an object form for dehydratedState

    const fetchSources = () => fetch("https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US", {headers: {'x-api-key': 'L2auYD6LCiCr0xDqxJKH8o1HPib8kJq_2EJUGwy_i8o'}}).then(resp => resp.json()).then(data => ({ data }))
    
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["sources", "us"],
        queryFn: fetchSources,
        // staleTime: 86400000,
        // cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient).queries[0].state,
            // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
        }
    }
}

export default NewsSources