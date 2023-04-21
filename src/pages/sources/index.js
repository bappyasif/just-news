import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const NewsSources = ({ test, data }) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const router = useRouter();

    console.log(entries, "!!", test, data?.length, router.query, fetchData)

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

    return {
        props: {
            test: "test",
            data: data
        }
    }
}

export default NewsSources