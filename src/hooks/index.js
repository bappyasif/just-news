import { AppContext } from "@/contexts"
import { useContext, useEffect, useState } from "react"

export const useAppContext = () => {
    const ctx = useContext(AppContext)

    if(ctx === undefined) {
        throw new Error ("Context is not found")
    }

    return ctx;
}

export const useForContentRendering = (sources, filtersInUse, initialTo ) => {
    const [arrParts, setArrParts] = useState({});

    const [sourcesParts, setSourcesParts] = useState();

    const handleForward = () => {
        if (arrParts?.to <= sources?.length && arrParts?.to >= 0) {
            // console.log("forward - 2!!")
            if (sources.length - arrParts?.to >= initialTo) {
                // console.log("if block")
                setArrParts(prev => {
                    // console.log(prev.to + 100, typeof prev.to + 100)
                    return {
                        from: prev?.to,
                        to: prev.to + initialTo
                    }
                })
            } else {
                // console.log("else block")
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
                    // console.log(prev.to + 100, typeof prev.to + 100)
                    return {
                        from: prev.from - initialTo,
                        to: prev.from
                    }
                })
            } else {
                setArrParts(prev => {
                    const nextFrom = prev.from - (sources.length - prev.from)
                    // console.log(nextFrom, prev.from, prev.to === sources?.length)
                    if (prev.to === sources?.length) {
                        // console.log(100 - prev.to, prev.to, sources.length, sources.length % 100)
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

    return {sourcesParts, handleBackward, handleForward}
}