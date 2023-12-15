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

export const fetchNextBunchOfNewsArticles = async (nextPageRef, filtersUsed) => {
    const params = {
        page: nextPageRef,
        apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY, 
        image: 1, 
        full_content: 1,
        language: "en",
        ...filtersUsed
    }

    const response = await fetchSourcesOnRequests({ url: "/news", params })

    return response
}

export const useForContentRendering = (sources, filtersInUse, initialTo, nextPageRef, filtersUsed) => {
    const [arrParts, setArrParts] = useState([]);

    const [pageNum, setPageNum] = useState(0);

    const fetchNextPageNews = async () => {
        const response = await fetchNextBunchOfNewsArticles(arrParts[arrParts.length -1]?.nextPage, filtersUsed)

        if(response?.data) {
            setArrParts(prev => ([
                ...prev,
                {pageNum: pageNum+1, data: response.data.results, nextPageRef: response.data.nextPage}
            ]))
        }
    }

    const handleForward = () => {
        setPageNum(prev => {
            if(pageNum === arrParts[arrParts.length -1]?.pageNum) {
                fetchNextPageNews()
            }

            return prev + 1
        })
    }

    const handleBackward = () => {
        setPageNum(prev => {
            if (prev > 1) {
                return prev - 1
            }

            return prev
        })
    }

    useEffect(() => {
        if (sources?.length, nextPageRef) {
            setPageNum(1)
            setArrParts([{ pageNum: 1, data: sources, nextPage: nextPageRef }]) 
        }
    }, [sources, nextPageRef])

    return { sourcesParts: arrParts[pageNum-1]?.data || [], handleBackward, handleForward }
}

export const useForSafetyKeepingOfFilters = (entries) => {
    const { isTrue, makeFalsy, makeTruthy } = useForTruthToggle()

    const [filtersUsed, setFiltersUsed] = useState({})

    useEffect(() => {
        Object.keys(entries).length && setFiltersUsed(entries)
        Object.keys(entries).length && makeFalsy()
    }, [entries])

    return { isTrue, makeFalsy, makeTruthy, filtersUsed }
}

export const useFilteredDataFetchingForSources = (fetchData, entries, endpoint, neutralizeVariablesAfterFetch) => {
    const makeRequest = () => {
        const url = endpoint;
        const params = { ...entries, apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}
        return fetchSourcesOnRequests({ url, params })
    }

    const { data: filteredFetchedSourcesData } = useQuery({
        queryKey: ["sources", `${makeKeys(entries)}`],
        queryFn: makeRequest,
        enabled: fetchData && Object.values(entries).length ? true : false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            neutralizeVariablesAfterFetch()
        },
        onError: (err) => {
            console.log(err, "ERRYERRR")
        },
        cacheTime: 86400000,
        retryDelay: 4000
    })

    return { filteredFetchedSourcesData }
}

export const useFilteredDataFetching = (fetchData, entries, endpoint, neutralizeVariablesAfterFetch) => {
    const makeRequest = () => {
        const url = endpoint;
        
        const params = { ...entries, apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY, image: 1, full_content: 1 }
        
        return fetchSourcesOnRequests({ url, params })
    }

    const { data: filteredFetchedData, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["news", `${makeKeys(entries)}`],
        queryFn: makeRequest,
        enabled: fetchData && Object.values(entries).length ? true : false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            neutralizeVariablesAfterFetch()
            setTimeout(() => {
                !data?.data?.results?.length && alert("found nothing!! try a different option maybe?! thanks :)")
            }, 4500)
        },
        onError: (err) => {
            console.log(err, "ERRYERRR")
        },
        cacheTime: 86400000,
        retryDelay: 4000
    })

    return { filteredFetchedData, isLoading, isError, isSuccess }
}

export const useForTruthToggle = () => {
    const [isTrue, setIsTrue] = useState(false);
    const makeFalsy = () => setIsTrue(false)
    const makeTruthy = () => setIsTrue(true)
    return { isTrue, makeFalsy, makeTruthy }
}

export const useForDefaultFetchingForSources = (urlStr, keys) => {
    // console.log(urlStr, keys, "wtf!!")
    const { data: defaultFetchedData, isLoading, isError, isSuccess } = useQuery({
        queryKey: keys,
        queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/${urlStr}`),
        onSuccess: (data) => {
            // console.log(data, "!! default data!!")
        },
        refetchOnWindowFocus: false
    })

    return { defaultFetchedData, isLoading, isError, isSuccess }
}

export const useForDefaultFetching = (urlStr, keys, routerQuery) => {
    const { data: defaultFetchedData, isLoading, isError, isSuccess } = useQuery({
        queryKey: keys,
        enabled: !Object.keys(routerQuery).length,
        queryFn: () => fetchSourcesForDefault(`https://newsdata.io/api/1/${urlStr}`),
        onSuccess: (data) => {
            // console.log(data, "!! default data!!")
        },
        refetchOnWindowFocus: false
    })

    return { defaultFetchedData, isLoading, isError, isSuccess }
}

export const useStaticPreFetching = (urlStr, keys) => {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: keys,
        queryFn: () => fetchSourcesForDefault(`https://api.newscatcherapi.com/v2/${urlStr}`),
        cacheTime: 86400000
    })

    return { queryClient }
}

export const useMaintainUserInteractions = (endpoint, type, defaultName, newsData) => {
    const [entries, setEntries] = useState({});
    const [showFilters, setShowFilters] = useState(true);
    const [fetchData, setFetchData] = useState(false);
    const { handleUpdateSavedFilters } = useAppContext();

    const { data: session } = useSession()

    const router = useRouter()

    const handleHttpRequestWhenSourceOrSearchQueryExists = () => {
        if (entries?.q || entries?.domainurl) {
            let data;
            if (entries.q) {
                data = { type: "q", text: entries.q }
            } else if (entries.domainurl) {
                data = { type: "sources", text: entries.domainurl }
            }

            // trying to deny wrting to db when there is no data found with any given filters
            // if(!newsData.length) return

            // happensAfterHttpRequest(() => setEntries({}), { data, url: "/liveSearch", method: "POST" })

            session?.user?.sub && happensAfterHttpRequest(() => setEntries({}), { data, url: "/liveSearch", method: "POST" })
        }
    }

    const handleHideFilters = () => {
        setFetchData(true);
        if (router.pathname === "/news" && !entries?.q) {
            alert("search term needs to be there")
        } else {
            handleHttpRequestWhenSourceOrSearchQueryExists();
            router.push(`/${type.toLowerCase()}?${makeRoutes(entries)}`, undefined, { shallow: true })
        }
    }

    const handleSaveSearchedFilters = () => {
        const url = endpoint;
        const data = JSON.stringify(entries)
        const params = { user_id: session?.user?.sub, type }
        const method = "POST"
        const headers = { "Content-Type": "application/json" }

        sendHttpReuestToInternalApi({ url: "/forNews", data, method, params, headers })
            .then(resp => {
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
        // setEntries({})
    }

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

    return { routerQuery: router.query }
}

export const useForFetchFiltersSavedByUserFromServer = () => {
    const { data: session } = useSession()
    const { handleInitialFiltersSavedByUser } = useAppContext(AppContext)

    const params = { user_id: session?.user?.sub };
    const method = "GET";
    const url = "/forNews"

    const fetchOnce = () => {
        sendHttpReuestToInternalApi({ url, params, method })
            .then(resp => {
                if (resp.status === 200) {
                    const dataConverted = convertUserInputsDataFromServer(resp.data.savedFilters)
                    handleInitialFiltersSavedByUser(dataConverted)
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
        setResults(data)
    }

    useQuery({
        queryKey: ["live search", `${type}`],
        queryFn: () => happensAfterHttpRequest(handleUpdate, { url, method, params: { type } }),
        enabled: router.pathname === "/" ? true : false,
        refetchInterval: 240000
        // refetchInterval: 2000
    })

    return { results }
}