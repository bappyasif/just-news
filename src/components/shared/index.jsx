import languageCodes from "@/data/languageCodes.json"
import countryCodes from "@/data/countryCodes.json"

export const RenderAllAvailableLanguages = () => {
    const renderList = () => languageCodes?.map(item => <RenderListItem key={item.name} item={item} />)

    return (
        <select>
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
    // const renderChoices = () => choices?.map(opt => <option key={opt} value={opt}>{opt}</option>)

    return <RenderList items={choices} defaultText={"Choose isMultiple"} listName={"isMultiple"} handleChange={handleChange} />
}

export const MultipleCountriesHandleInputs = ({ handleChanges }) => {
    return (
        <div className="relative">
            <input
                type="text"
                onChange={e => handleChanges(e, "countries")}
            />
            <ShowValidCountryCodesAsExample />
        </div>
    )
}

const ShowValidCountryCodesAsExample = () => {
    return (
        <p className="absolute">use comma in bvetween: us,uk,bd,gb,jp,br</p>
    )
}

export const ShowTopics = ({handleTopics}) => {
    const list = ['tech', 'news', 'business', 'science', 'finance', 'food', 'politics', 'economics', 'travel', 'entertainment', 'music', 'sport', 'world']
    // const renderList = () => list.map(name => <option key={name} value={name}>{name}</option>)

    return <RenderList handleChange={handleTopics} items={list} defaultText={"Select Topic"} listName={"topics"} />
}

const RenderList = ({items, defaultText, listName, handleChange}) => {
    const renderList = () => items.map(name => <option key={name} value={name}>{name}</option>)

    return (
        <select onChange={evt => handleChange(evt, listName)} name={listName} id={listName}>
            {listName !== "isMultiple" ? <option value="-1">{defaultText}</option> : null}
            {renderList()}
        </select>
    )
}