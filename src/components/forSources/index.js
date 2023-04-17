import { useGetJsonData } from '@/hooks'
// import languageCodes from "@/utils/languageCodes.json"
import React from 'react'

export const SelectLanguage = () => {
    useGetJsonData().then(d => console.log(d))
    // fetch("../utils/languageCodes.json").then(res => res.json()).then(d => console.log(d))
    // console.log(languageCodes, "dataaaaa")
    // console.log(data, "!!")
    return (
        <div>index</div>   
    )
}

export const ChooseIfCountries = () => {
    return (
        <div>index</div>
    )
}
