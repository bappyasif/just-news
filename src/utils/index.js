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
            str += `${key}=${entries[key]}&`
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

const remove = "Country\n\nUnited States of America US Virgin Islands United States Minor Outlying Islands Canada Mexico, United Mexican States Bahamas, Commonwealth of the Cuba, Republic of Dominican Republic Haiti, Republic of Jamaica Afghanistan Albania, People's Socialist Republic of Algeria, People's Democratic Republic of American Samoa Andorra, Principality of Angola, Republic of Anguilla Antarctica (the territory South of 60 deg S) Antigua and Barbuda Argentina, Argentine Republic Armenia Aruba Australia,"

const removeArticlesContainingSummary = (arr) => {
    return arr.filter(item => item?.summary !== remove)
}

export const filterArticlesOfDuplicates = (arr) => {
    let articles = [];
    articles = arr?.filter((val, idx, self) => {
      return idx === self.findIndex(t => (t.title === val.title && t.author.toLowerCase() === val.author.toLowerCase()))
    })
    console.log(articles, "HERE")
    // return articles
    return removeArticlesContainingSummary(articles)
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

export const sendHttpReuestToInternalApi = options => internalApiRequestInterceptor(options)

const internalApiRequestInterceptor = ({...options}) => {
    // const client = axios.create({baseURL: "http://localhost:3000/api/saveFilters"})
    const client = axios.create({baseURL: "http://localhost:3000/api/jnApp"})

    const onSuccess = resp => resp

    const onError = err => err

    return client(options).then(onSuccess).catch(onError)
}

export const convertUserInputsDataFromServer = (dataset) => {
    let data =  [];
    dataset?.forEach(item => {
        item.user_input = item.user_input[0]
        console.log(item.user_input[0])
        data.push(item)
    })

    return data
}

export const happensAfterHttpRequest = (dataUpdater, options) => {
    return sendHttpReuestToInternalApi(options)
        .then(resp => {
            if(resp.status === 200) {
                dataUpdater(resp.data.data)
            } else if(resp.status >= 400) {
                console.log("oops something is wrong!!")
            }
            console.log(resp)
            return resp
        }).catch(err => {
            copnsole.log("error occured", err)
        })
}