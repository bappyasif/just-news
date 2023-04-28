import { AppContext } from "@/contexts"
import { fetchSourcesForDefault, fetchSourcesOnRequests, makeKeys, sendHttpReuestToInternalApi } from "@/utils"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"

export const useAppContext = () => {
    const ctx = useContext(AppContext)

    if (ctx === undefined) {
        throw new Error("Context is not found")
    }

    return ctx;
}

export const useForContentRendering = (sources, filtersInUse, initialTo) => {
    const [arrParts, setArrParts] = useState({});

    const [sourcesParts, setSourcesParts] = useState();

    const handleForward = () => {
        if (arrParts?.to <= sources?.length && arrParts?.to >= 0) {
            if (sources.length - arrParts?.to >= initialTo) {
                setArrParts(prev => {
                    return {
                        from: prev?.to,
                        to: prev.to + initialTo
                    }
                })
            } else {
                setArrParts(prev => {
                    const nextTo = prev.to + (sources.length - prev.to)
                    if (nextTo > prev.to) {
                        return {
                            from: prev.to,
                            to: prev.to + (sources.length - prev.to)
                        }
                    } else {
                        return {
                            from: prev.from,
                            to: prev.to
                        }
                    }
                })
            }
        }
    }

    const handleBackward = () => {
        if (arrParts?.to <= sources?.length && arrParts?.to >= 0) {
            if (sources.length - arrParts?.from >= initialTo && arrParts?.from > 0) {
                setArrParts(prev => {
                    return {
                        from: prev.from - initialTo,
                        to: prev.from
                    }
                })
            } else {
                setArrParts(prev => {
                    const nextFrom = prev.from - (sources.length - prev.from)
                    if (prev.to === sources?.length) {
                        return {
                            from: sources.length - (sources.length % initialTo) - initialTo,
                            to: sources.length - (sources.length % initialTo)
                        }
                    }
                    if (nextFrom < prev.from && nextFrom > 0) {
                        return {
                            from: nextFrom,
                            to: prev.to - (sources.length - prev.to)
                        }
                    } else {
                        return {
                            from: prev.from,
                            to: prev.to
                        }
                    }
                })
            }
        }
    }

    const handleSourcesParts = () => {
        const from = arrParts?.from
        const to = arrParts?.to

        // console.log(from, to, sources?.filter((v, i) => i >= from && i < to && v))

        setSourcesParts(sources?.filter((v, i) => i >= from && i < to && v))
    }

    useEffect(() => {
        setArrParts({ from: 0, to: initialTo || 100 })
    }, [])

    useEffect(() => {
        handleSourcesParts()
    }, [arrParts, sources])

    return { sourcesParts, handleBackward, handleForward }
}

export const useFilteredDataFetching = (fetchData, entries, setFetchData, endpoint) => {
    const makeRequest = () => {
        const method = "GET"
        const url = endpoint
        const params = { ...entries }
        const headers = { 'x-api-key': process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY }
        console.log(url, params, headers)
        return fetchSourcesOnRequests({ method, url, params, headers })
    }

    const { data: filteredFetchedData } = useQuery({
        queryKey: ["sources", `${makeKeys(entries)}`],
        queryFn: makeRequest,
        enabled: fetchData && Object.values(entries).length ? true : false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log(data, "!!data!!", `${makeKeys(entries)}`, Object.keys(entries).length)
            setFetchData(false);
        },
        cacheTime: 86400000
    })

    return { filteredFetchedData }
}

export const useForDefaultFetching = (urlStr, keys) => {
    // console.log(urlStr, keys, "wtf!!")
    const { data: defaultFetchedData } = useQuery({
        queryKey: keys,
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/${urlStr}`),
        // enabled: false
        onSuccess: (data) => {
            console.log(data, "!! default data!!")
        },
        refetchOnWindowFocus: false
    })

    return { defaultFetchedData }
}

export const useSSGPreFetching = (urlStr, keys) => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: keys,
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/${urlStr}`),
        cacheTime: 86400000
    })

    return { queryClient }
}

export const useMaintainUserInteractions = (endpoint) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);
    const {handleUpdateSavedFilters} = useAppContext()

    const handleHideFilters = () => {
        setFetchData(true);
        setShowFilters(false);
    }

    const handleSaveSearchedFilters = () => {
        console.log("save it!!")
        setShowFilters(false)
        handleUpdateSavedFilters(entries, "news")

        // uncomment when ready for db sync
        // const url = endpoint;
        // // const body = JSON.stringify({...entries})
        // // const params = {...entries}
        // // const method = "GET"
        // const data = JSON.stringify(entries)
        // const method = "POST"
        // const headers = { "Content-Type": "application/json" }
        // sendHttpReuestToInternalApi({url, data, method, headers})
        // .then((v) => {
        //     console.log(v, "<><><><>")
        // }).catch(err => console.log(err))
        // .finally(() => setShowFilters(false))
    }

    const handleToggleShowFilters = () => setShowFilters(prev => !prev);
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))

    return {entries, showFilters, fetchData, setFetchData, handleEntries, handleToggleShowFilters, handleHideFilters, handleSaveSearchedFilters}
}