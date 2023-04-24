export const initialState = {
    sources: [],
    news: [],
    headlines: [],
    savedFilters: []
}

export const ACTIONS = {
    UPDATE_SOURCES: "update_news_sources",
    UPDATE_NEWS: "update_filtered_news",
    UPDATE_HEADLINES: "update_filtered_headlines",
    UPDATE_FILTERS: "update_user_saved_filters"
}

export const justNewsSiteReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ACTIONS.UPDATE_SOURCES:
            return {
                ...state,
                sources: payload.sources
            }
        case ACTIONS.UPDATE_NEWS:
            return {
                ...state,
                news: payload.news
            }
        case ACTIONS.UPDATE_HEADLINES:
            return {
                ...state,
                headlines: payload.headlines
            }
        case ACTIONS.UPDATE_FILTERS:
            return {
                ...state,
                savedFilters: payload.savedFilters
            }
        default:
            throw new Error (`There is no action found for type: ${type} in reducer function `)
    }
}