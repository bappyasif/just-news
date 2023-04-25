import axios from "axios";

export const restructureAllUsedFilters = (filtersUsed) => {
    const filters = [];

    for (let key in filtersUsed) {
        if (filtersUsed[key]) {
            const temp = { name: key, vals: filtersUsed[key] }
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

export const makeKeys = (entries) => {
    let allKeys = [];
    for (let key in entries) {
        if (entries[key]) {
            allKeys.push(entries[key])
        }
    }
    return allKeys.sort().join(", ")
}

export const filterArticlesOfDuplicates = (arr) => {
    let articles = [];
    articles = arr?.filter((val, idx, self) => {
      return idx === self.findIndex(t => (t.title === val.title && t.author.toLowerCase() === val.author.toLowerCase()))
    })
    console.log(articles, "HERE")
    return articles
  }

export const fetchSourcesForDefault = (url) => fetch(
    url,
    { headers: { 'x-api-key': process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY } })
    .then(resp => resp.json()).then(d => d)

export const fetchSourcesOnRequests = (options) => newsApiRequestInterceptor(options).then(data => data)

export const newsApiRequestInterceptor = ({ ...options }) => {
    const client = axios.create({ baseURL: "https://api.newscatcherapi.com/v2" })

    const onSuccess = resp => resp

    const onError = err => err

    return client(options).then(onSuccess).catch(onError)
}