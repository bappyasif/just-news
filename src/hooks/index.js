import { AppContext } from "@/contexts"
import { useContext } from "react"

export const useAppContext = () => {
    const ctx = useContext(AppContext)

    if(ctx === undefined) {
        throw new Error ("Context is not found")
    }

    return ctx;
}