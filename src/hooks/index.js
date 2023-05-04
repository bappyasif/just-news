import { AppContext } from "@/contexts"
import { happensAfterHttpRequest, makeRoutes } from "@/utils"
import { convertUserInputsDataFromServer, fetchSourcesForDefault, fetchSourcesOnRequests, makeKeys, sendHttpReuestToInternalApi } from "@/utils"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
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

export const useFilteredDataFetching = (fetchData, entries, endpoint, neutralizeVariablesAfterFetch) => {
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
            // setFetchData(false);
            // setShowFilters(false)
            neutralizeVariablesAfterFetch()
        },
        cacheTime: 86400000,
        retryDelay: 4000
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

export const useMaintainUserInteractions = (endpoint, type, defaultName) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);
    const { handleUpdateSavedFilters } = useAppContext();

    const { data: session } = useSession()

    const router = useRouter()

    const handleHttpRequestWhenSourceOrSearchQueryExists = () => {
        console.log("OUTSIE")
        if(entries?.q || entries.sources) {
            let data;
            console.log("INSIDE")
            if(entries.q) {
                data = {type: "q", text: entries.q}
            } else if(entries.sources) {
                data = {type: "sources", text: entries.sources}
            }
            // happensAfterHttpRequest(() => setShowFilters(false), {data, url: "/liveSearch", method: "POST"})
            // happensAfterHttpRequest(() => null, {data, url: "/liveSearch", method: "POST"})
            happensAfterHttpRequest(() => setEntries({}), {data, url: "/liveSearch", method: "POST"})
        } 
        // else {
        //     setEntries({})
        //     console.log("REMOVE ENTRIES")
        // }
    }

    const handleHideFilters = () => {
        setFetchData(true);
        handleHttpRequestWhenSourceOrSearchQueryExists();
        // setShowFilters(false);
        router.push(`/${type.toLowerCase()}?${makeRoutes(entries)}`, undefined, { shallow: true })
    }

    const handleSaveSearchedFilters = () => {
        console.log("save it!!")
        // setShowFilters(false)
        // handleUpdateSavedFilters(entries, type, defaultName, session?.user?.sub)

        // uncomment when ready for db sync
        const url = endpoint;
        // const body = JSON.stringify({...entries})
        // const params = {...entries}
        // const method = "GET"
        // const data = JSON.stringify(entries, {user_id: session?.user?.sub})
        // const data = JSON.stringify({user_id: session?.user?.sub, ...entries})
        const data = JSON.stringify(entries)
        const params = { user_id: session?.user?.sub, type }
        const method = "POST"
        const headers = { "Content-Type": "application/json" }
        // sendHttpReuestToInternalApi({url, data, method, headers})
        sendHttpReuestToInternalApi({ url: "/forNews", data, method, params, headers })
            .then(resp => {
                // console.log(resp, "<><><><>")
                if (resp.status === 200) {
                    handleUpdateSavedFilters(entries, type, defaultName, session?.user?.sub)
                    setShowFilters(false)
                } else if (resp.status >= 400) {
                    alert(resp.data.msg)
                }
            }).catch(err => console.log(err))
            .finally(() => setShowFilters(false))
    }

    const handleToggleShowFilters = () => {
        setShowFilters(prev => !prev);
        setEntries({})
    }
    const handleEntries = (evt, elem) => setEntries(prev => ({ ...prev, [elem]: evt.target.value }))
    const neutralizeVariablesAfterFetch = () => {
        setFetchData(false);
        setShowFilters(false)
        setEntries({})
    }

    // useEffect(() => {
    //     !fetchData && setEntries({})
    // }, [fetchData, setEntries])
    
    return { entries, showFilters, fetchData, setFetchData, handleEntries, handleToggleShowFilters, handleHideFilters, handleSaveSearchedFilters, neutralizeVariablesAfterFetch }
}

export const useForShallowQuery = (setFetchData) => {
    const router = useRouter()

    useEffect(() => {
        if (Object.values(router.query).length) {
            setTimeout(() => {
                setFetchData(true)
            }, 1003)
        }
    }, [router.query])

    console.log(router.query, "router.query!!!!")

    return { routerQuery: router.query }
}

export const useForFetchFiltersSavedByUserFromServer = () => {
    const { data: session } = useSession()
    const { handleInitialFiltersSavedByUser } = useAppContext(AppContext)

    const params = { user_id: session?.user?.sub };
    const method = "GET";
    const url = "/forNews"

    // console.log(url, params, method, session?.user)

    const fetchOnce = () => {
        sendHttpReuestToInternalApi({ url, params, method })
            .then(resp => {
                if (resp.status === 200) {
                    console.log(resp.data, resp)
                    // console.log(convertUserInputsDataFromServer(resp.data.savedFilters))
                    const dataConverted = convertUserInputsDataFromServer(resp.data.savedFilters)
                    handleInitialFiltersSavedByUser(dataConverted)
                    // handleInitialFiltersSavedByUser(resp.data.savedFilters)
                } else if (resp.status >= 400) {
                    alert(resp.data.msg)
                }
            })
    }

    useEffect(() => {
        fetchOnce()
    }, [session?.user?.sub])
}

export const useForLiveSearches = (type) => {
    const [results, setResults] = useState([]);

    const url = "/liveSearch";
    const method = "GET";

    const router = useRouter();

    const handleUpdate = (data) => {
        console.log(data, "DATA!! runnig every two seconds")
        setResults(data)
    }

    useQuery({
        queryKey: ["live search", `${type}`],
        queryFn: () => happensAfterHttpRequest(handleUpdate, {url, method, params:{type}}),
        enabled: router.pathname === "/" ? true : false,
        refetchInterval: 240000
    })

    return {results}
}