import { RenderAllNewsSources } from '@/components/forSources';
import { ReuseableRelatedUi, ToogleFilters } from '@/components/shared'
import { useAppContext } from '@/hooks';
import { makeRoutes } from '@/utils';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const fetchSources = () => fetch("https://api.newscatcherapi.com/v2/sources?topic=business&lang=en&countries=US",
    { headers: { 'x-api-key': 'L2auYD6LCiCr0xDqxJKH8o1HPib8kJq_2EJUGwy_i8o' } })
    .then(resp => resp.json()).then(d => d)

const NewsSources = () => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);

    const handleHideFilters = () => setShowFilters(false);
    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    const router = useRouter();

    const appCtx = useAppContext()

    const { data: sources } = useQuery({
        queryKey: ["sources", "us"],
        queryFn: fetchSources,
        onSuccess: (data) => {
            console.log(data, "!!data!!", appCtx.sources)
        }
    })

    console.log(sources, entries, "!!", router.query, fetchData, appCtx.sources)

    const handleShallowRoutes = () => {
        if (Object.keys(entries).length) {
            handleHideFilters();
            setFetchData(true)
            router.push(`/sources${makeRoutes(entries)}`, undefined, { shallow: true })
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
                        width={"434px"}
                        height={"355px"}
                        handleEntries={handleEntries}
                        handleHideFilters={handleShallowRoutes}
                    />
                    : null
            }

            {
                fetchData || sources?.sources?.length
                    ? <RenderAllNewsSources sources={sources?.sources} filtersInUse={sources?.user_input} />
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
        queryFn: fetchSources,
        cacheTime: 86400000
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default NewsSources