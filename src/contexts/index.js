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

    const handleUpdateSavedFilters = (filtersUsed, type, defaultName, userId) => {
        const found = state?.savedFilters.find(item => {
            if (item?.type === type) {
                return JSON.stringify(filtersUsed) === JSON.stringify(item?.user_input)
            }
        })

        let newList = []

        const filtersEntries = { user_input: filtersUsed, type, name: defaultName + (state?.savedFilters?.length || 0), user_id: userId }

        newList = !found ? newList.concat(...state?.savedFilters, filtersEntries) : state?.savedFilters

        dispatch({
            type: ACTIONS.UPDATE_FILTERS,
            payload: {savedFilters: newList}
        })
    }

    const initialUpdateForFiltersSavedByUser = (data) => {
        dispatch({
            type: ACTIONS.UPDATE_FILTERS,
            payload: {savedFilters: data}
        })
    }

    const deleteThisSavedFilter = (id) => {
        const newList = state.savedFilters.filter(item => item._id !== id)
        dispatch({
            type: ACTIONS.UPDATE_FILTERS,
            payload: {savedFilters: newList}
        })
    }

    const value = {
        sources: state.sources,
        updateNewsSources: updateNewsSources,
        handleUpdateSavedFilters: handleUpdateSavedFilters,
        handleInitialFiltersSavedByUser: initialUpdateForFiltersSavedByUser,
        handleDeleteSavedFilter: deleteThisSavedFilter,
        savedFilters: state.savedFilters
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}