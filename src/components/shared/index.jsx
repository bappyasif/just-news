import languageCodes from "@/data/languageCodes.json"
import countryCodes from "@/data/countryCodes.json"
import { useState } from "react"
import { types } from "@/data"

export const RenderAllAvailableLanguages = ({ handleChange }) => {
    const renderList = () => languageCodes?.map(item => <RenderListItem key={item.name} item={item} />)

    return (
        <select onChange={e => handleChange(e, "languages")}>
            <option value="-1">Select Language</option>
            {renderList()}
        </select>
    )
}

const RenderListItem = ({ item }) => {
    const { name, code } = item

    return (
        <option value={code}>{name}</option>
    )
}

export const RenderAllPublishingCountries = ({ handleCountries }) => {
    const renderList = () => countryCodes?.map(item => <RenderListItem key={item.name} item={item} />)

    return (
        <select onChange={e => handleCountries(e, "countries")}>
            <option value="-1">Publishing Country</option>
            {renderList()}
        </select>
    )
}

export const ChooseIfMultipleCountries = ({ handleChange }) => {
    const choices = ["Single", "Multiple"];

    return <RenderList items={choices} defaultText={"Choose isMultiple"} listName={"isMultiple"} handleChange={handleChange} />
}

export const MultipleCountriesHandleInputs = ({ handleChanges }) => {
    const handleValues = evt => {
        handleChanges(evt, "countries")
    }

    return (
        <div className="relative">
            <UserInput handleValueChanges={handleValues} labelText={"Countries "} placeholderText={"Type In Country Codes"} />
            <ShowValidCountryCodesAsExample />
        </div>
    )
}

export const UserInput = ({ handleValueChanges, labelText, placeholderText }) => {
    return (
        <label>
            {labelText}
            <input
                className="ml-4"
                type="text"
                onChange={handleValueChanges}
                placeholder={placeholderText}
            />
        </label>
    )
}

const ShowValidCountryCodesAsExample = () => {
    return (
        <p className="absolute">use comma in bvetween: us,uk,bd,gb,jp,br</p>
    )
}

export const ShowTopics = ({ handleTopics }) => {
    const list = ['tech', 'news', 'business', 'science', 'finance', 'food', 'politics', 'economics', 'travel', 'entertainment', 'music', 'sport', 'world']

    return <RenderList handleChange={handleTopics} items={list} defaultText={"Select Topic"} listName={"topics"} />
}

const RenderList = ({ items, defaultText, listName, handleChange }) => {
    const renderList = () => items.map(name => <option key={name} value={name}>{name}</option>)

    return (
        <select onChange={evt => handleChange(evt, listName)} name={listName} id={listName}>
            {listName !== "isMultiple" ? <option value="-1">{defaultText}</option> : null}
            {renderList()}
        </select>
    )
}

const AdvancedNewsQueryExamples = () => {
    const [whichType, setWhichType] = useState("")

    const handleTypes = (evt) => {
        const elem = evt.target.value
        const foundItem = types.find(item => item.name === elem)

        setWhichType(foundItem)
    }

    const renderList = () => types.map(item => <option key={item.name} value={item.name}>{item.name}</option>)

    return (
        <div>
            <select onChange={e => handleTypes(e)}>
                <option value="-1">Query Examples</option>
                {renderList()}
            </select>
            <p>{whichType?.text}</p>
        </div>
    )
}

export const GetUserSearchQuery = () => {
    return (
        <div className="flex items-baseline">
            <AdvancedNewsQueryExamples />
            <UserInput
                labelText={"Search Term"}
                placeholderText={"Enter Your Search Term"}
            />
        </div>
    )
}

export const ChooseNewsTimePeriod = ({ handleTime }) => {
    const periods = ["30d", "7d", "24h", "1h"];

    return <RenderList handleChange={handleTime} items={periods} defaultText={"Time Period"} listName={"time"} />
}

export const GetNewsSourcesInput = ({handleSources}) => {
    const handleChange = evt => handleSources(evt, "sources")
    return (
        <div>
            <UserInput
                labelText={"Sources: "}
                placeholderText={"Give sources proper url"}
                handleValueChanges={handleChange}
            />
            <p>For example, nytimes.com,theguardian.com</p>
        </div>
    )
}

export const ReUseableJustUi = ({ handleEntries }) => {
    const [multiple, setMultiple] = useState("Single")
    const handleIfMultiples = evt => setMultiple(evt.target.value)

    return (
        <section>
            <RenderAllAvailableLanguages handleChange={handleEntries} />
            <ChooseIfMultipleCountries handleChange={handleIfMultiples} />
            {
                multiple === "Multiple"
                    ? <MultipleCountriesHandleInputs handleChanges={handleEntries} />
                    : <RenderAllPublishingCountries handleCountries={handleEntries} />
            }
            <ShowTopics handleTopics={handleEntries} />
        </section>
    )
}