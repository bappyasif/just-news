import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const NewsSources = ({ test, data, posts, dehydratedState}) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const router = useRouter();

    // console.log(entries, "!!", test, data?.length, router.query, fetchData, posts?.length, dehydratedState?.data?.data?.length, dehydratedState?.queries[0]?.state?.data?.length)
    // console.log(entries, "!!", test, data?.length, router.query, fetchData, posts?.length, dehydratedState?.data?.data?.length)
    console.log(entries, "!!", test, data?.length, router.query, fetchData, dehydratedState?.data?.data?.length)

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

// const ssrCache = new LRUCache({
//     max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
//     length: function (n, key) {
//         return n.length
//     },
//     maxAge: 1000 * 60 * 60 * 24 * 30
// });

export const getServerSideProps = async (context) => {
    // query will show up when app runs in "start" mode
    const { params, req, res, query } = context;
    // const ctx = useContext()
    console.log("pre-rendeing", params, query)
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await resp.json();
    // res.setHeader("Cache-Control", "public, s-maxage=20, stale-while-revalidate=19")

    // just change  axios.get(url) to axios.get(url).then(res=>res.data)
    // const fetchPosts = () => fetch("https://jsonplaceholder.typicode.com/posts").then(resp => resp.json()).then(data => data)
    // as data needs to be serializable, thats why sending data back as an object form for dehydratedState
    const fetchPosts = () => fetch("https://jsonplaceholder.typicode.com/posts").then(resp => resp.json()).then(data => ({data}))

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts,
        staleTime: 40000,
        cacheTime: 40000
    })

    // const posts = await resp2.json()


    return {
        props: {
            test: "test",
            data: data,
            dehydratedState: dehydrate(queryClient).queries[0].state,
            // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
            // posts: posts?.data
        }
    }
}

export default NewsSources