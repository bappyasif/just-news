import languageCodes from "@/data/languageCodes.json"
import countryCodes from "@/data/countryCodes.json"
import { useState } from "react"
import { types } from "@/data"
import filterIcon from "../../../public/newspapersPile.jpg"
import { MdFilter3, MdFilter5, MdFilter7 } from 'react-icons/md';
import filterBG from "../../../public/teamWork.jpg"
import Image from "next/image"

export const RenderAllAvailableLanguages = ({ handleChange, elemName }) => {
    const renderList = () => languageCodes?.map(item => <RenderListItem key={item.name} item={item} />)

    return (
        <select
            className="w-full"
            onChange={e => handleChange(e, elemName)}
        >
            <option value="-1">Click To Select Language</option>
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
        <label htmlFor="newsPublished">
            <p className="text-cyan-200 font-bold">Where News Published In</p>
            <select
                className="w-full"
                onChange={e => handleCountries(e, "countries")}
            >
                <option value="-1">Publishing Country</option>
                {renderList()}
            </select>
        </label>
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
            <p className='text-cyan-200 font-bold'>{labelText}</p>
            <input
                className=""
                type="text"
                onChange={handleValueChanges}
                placeholder={placeholderText}
            />
        </label>
    )
}

const ShowValidCountryCodesAsExample = () => {
    return (
        <p className="absolute text-sm text-blue-400 font-bold">use comma in bvetween: us,uk,bd,gb,jp,br</p>
    )
}

export const ShowTopics = ({ handleTopics }) => {
    const list = ['tech', 'news', 'business', 'science', 'finance', 'food', 'politics', 'economics', 'travel', 'entertainment', 'music', 'sport', 'world']

    return <RenderList labelText={"Choose From News Topics"} handleChange={handleTopics} items={list} defaultText={"Select Topic"} listName={"topics"} />
}

const RenderList = ({ labelText, items, defaultText, listName, handleChange }) => {
    const renderList = () => items.map(name => <option key={name} value={name}>{name}</option>)

    return (
        <label htmlFor={listName}>
            <p className="text-cyan-200 font-bold">{labelText}</p>
            <select
                className="w-full"
                onChange={evt => handleChange(evt, listName)}
                name={listName}
                id={listName}
            >
                {listName !== "isMultiple" ? <option value="-1">{defaultText}</option> : null}
                {renderList()}
            </select>
        </label>
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

    return <RenderList labelText={"News Period"} handleChange={handleTime} items={periods} defaultText={"Time Window"} listName={"time"} />
}

export const GetNewsSourcesInput = ({ handleSources }) => {
    const handleChange = evt => handleSources(evt, "sources")
    
    return (
        <div className="">
            <UserInput
                labelText={"Sources: "}
                placeholderText={"Give sources proper url"}
                handleValueChanges={handleChange}
            />
            <p className="text-sm text-yellow-400 font-bold">examples: nytimes.com,theguardian.com</p>
        </div>
    )
}

export const ReUseableJustUi = ({ handleEntries }) => {
    const [multiple, setMultiple] = useState("Single")
    const handleIfMultiples = evt => setMultiple(evt.target.value)

    return (
        <section className="flex flex-col gap-2">
            <ShowTopics handleTopics={handleEntries} />
            <NotInThisLanguage handleEntries={handleEntries} labelText={"Choose Language"} elemName={"language"} />
            <label htmlFor="ifMult">
                <p className="text-cyan-200 font-bold">If News From Single Country</p>
                <ChooseIfMultipleCountries handleChange={handleIfMultiples} />
            </label>
            {
                multiple === "Multiple"
                    ? <MultipleCountriesHandleInputs handleChanges={handleEntries} />
                    : <RenderAllPublishingCountries handleCountries={handleEntries} />
            }
        </section>
    )
}

export const NotInThisLanguage = ({ handleEntries, labelText, elemName }) => {
    return (
        <div>
            <p className="text-cyan-200 font-bold">{labelText}: </p>
            <RenderAllAvailableLanguages handleChange={handleEntries} elemName={elemName} />
        </div>
    )
}

export const ToogleFilters = ({ fromNewsSource, fromNewsSearch, showFilters, handleHideFilters, handleToggleShowFilters }) => {
    return (
        <div
            className='text-center text-2xl text-zinc-200'
            style={{ width: "184px" }}
            onClick={handleToggleShowFilters}
        >
            <ReUsableImageComponent
                height={"31px"}
                width={"184px"}
                // altText={"team work picture from unsplash used here as a background"}
                altText={"For Fill"}
                imgSrc={filterIcon}
            />
            <div className='flex gap-2 items-center justify-between' style={{ padding: "0 4px !important" }}>
                <span className=''> {showFilters ? "Hide" : "Show"} Filters</span>
                {fromNewsSearch ? <MdFilter5 /> : fromNewsSource ? <MdFilter3 /> : <MdFilter7 />}
            </div>

        </div>
    )
}

export const ReuseableRelatedUi = ({ height, width, children, handleEntries }) => {
    return (
        <section
            className='absolute px-2 mt-2'
            style={{
                width: "fit-content"
            }}
        >
            <ReUsableImageComponent
                height={height}
                width={width}
                altText={"For Fill"}
                imgSrc={filterBG}
            />
            <div
                className='text-xl my-2 flex flex-col gap-2'
            >
                <p className='text-cyan-400 font-extrabold text-center'>Select Your Filters Here</p>
                {children}
                <ReUseableJustUi handleEntries={handleEntries} />
            </div>
            <button className='bg-cyan-400 w-full rounded-md mt-4 text-2xl'>Search Now</button>
        </section>
    )
}

export const ReUsableImageComponent = ({ height, width, imgSrc, altText }) => {
    return (
        <div
            className='fixed'
            style={{
                height: height,
                width: width,
                overflow: "hidden",
                zIndex: - 1
            }}
        >
            <ImageComponent
                imgSrc={imgSrc}
                altText={altText}
            />
        </div>
    )
}

export const ImageComponent = ({ imgSrc, altText }) => {
    return (
        <Image
            // className='fixed'
            src={imgSrc}
            alt={altText}
            placeholder="blur"
            quality={100}
            style={{
                objectFit: altText === "For Fill" ? "fill" : altText === "For Logo" ? "contain" : "cover",
                height: altText === "For Fill" && "inherit",
                opacity: altText === "For Fill" && ".81"
            }}
        />
    )
}