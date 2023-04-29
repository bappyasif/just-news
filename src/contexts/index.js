import { ACTIONS, initialState, justNewsSiteReducer } from "@/reducers";
import { createContext, useReducer } from "react";

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(justNewsSiteReducer, initialState)

    const updateNewsSources = (sources, filtersUsed) => {
        const newEntry = { sources, filtersUsed }
        const updatedList = state.sources.concat(newEntry);

        dispatch({
            type: ACTIONS.UPDATE_SOURCES,
            payload: updatedList
        })
    }

    const handleUpdateSavedFilters = (filtersUsed, type) => {
        const found = state?.savedFilters.find(item => {
            console.log(item, item?.type, type, item?.type === type)
            if (item?.type === type) {
                // console.log(Object.entries(filtersUsed) === Object.entries(item?.user_input))
                console.log(JSON.stringify(filtersUsed) === JSON.stringify(item?.user_input))
                // return Object.entries(filtersUsed) === Object.entries(item?.user_input) && item
                return JSON.stringify(filtersUsed) === JSON.stringify(item?.user_input)
            }
        })

        let newList = []

        const filtersEntries = { user_input: filtersUsed, type, name: "NewsFilters:" + (state?.savedFilters?.length || 0),  }

        // !found ? newList.push(...initialState.savedFilters, filtersEntries) : newList.push(...initialState.savedFilters)
        // !found ? newList.push(...state?.savedFilters, filtersEntries) : newList.push(state?.savedFilters)
        newList = !found ? newList.concat(...state?.savedFilters, filtersEntries) : state?.savedFilters

        console.log(found, "found!!", newList)
        // console.log(found, filtersEntries, filtersUsed, initialState.savedFilters, newList, state.savedFilters)

        dispatch({
            type: ACTIONS.UPDATE_FILTERS,
            payload: {savedFilters: newList}
            // payload: !found ? initialState.savedFilters.push(filtersEntries) : initialState.savedFilters
        })
    }

    const value = {
        sources: state.sources,
        updateNewsSources: updateNewsSources,
        handleUpdateSavedFilters: handleUpdateSavedFilters,
        savedFilters: state.savedFilters
        // savedFilters: initialState.savedFilters
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}