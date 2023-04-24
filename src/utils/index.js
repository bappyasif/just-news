export const restructureAllUsedFilters = (filtersUsed) => {
    const filters = [];
    
    for(let key in filtersUsed) {
        if(filtersUsed[key]) {
            const temp = {name: key, vals: filtersUsed[key]}
            filters.push(temp)
        }
    }

    return filters
}

export const makeRoutes = (entries) => {
    let str = '';
    for (let key in entries) {
        if (entries[key]) {
            str += `?${key}=${entries[key]}`
        }
    }
    return str
}