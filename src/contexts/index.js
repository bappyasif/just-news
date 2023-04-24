import { ACTIONS, initialState, justNewsSiteReducer } from "@/reducers";
import { createContext, useReducer } from "react";

export const AppContext = createContext(initialState);

export const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(justNewsSiteReducer, initialState)

    const updateNewsSources = (sources, filtersUsed) => {
        const newEntry = {sources, filtersUsed}
        const updatedList = state.sources.concat(newEntry);

        dispatch({
            type: ACTIONS.UPDATE_SOURCES,
            payload: updatedList
        })        
    }

    const value = {
        sources: state.sources,
        updateNewsSources: updateNewsSources
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}