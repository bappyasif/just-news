import { useForContentRendering } from "@/hooks"
import { restructureAllUsedFilters } from "@/utils"
import Link from "next/link"
import { useRef } from "react"

export const RenderFiltersInUse = ({ data }) => {
    const dataset = restructureAllUsedFilters(data)

    const renderFilters = () => dataset?.map((item, idx) => <RenderFilter key={idx} item={item} />)

    return (
        <div className='text-xl bg-zinc-400 w-fit px-2 my-6'>
            <h2 className='text-2xl'>Filters In Use</h2>
            <ul className='flex gap-4 flex-wrap xxs:text-md lg:text-xl'>
                {renderFilters()}
            </ul>
        </div>
    )
}

const RenderFilter = ({ item }) => {
    const { name, vals } = item;

    if (vals == null || vals?.length == 0) return null

    if (name == "from" || name == "page") return null

    return (
        <li className="flex gap-2">
            <span>{name} : </span>
            {
                vals?.length && typeof vals !== "string"
                    ? <span>{vals?.map(txt => `${txt}`)}</span>
                    : <span>{vals}</span>
            }
        </li>
    )
}

export const RenderNewsArticles = ({ data }) => {
    const { sourcesParts, handleBackward, handleForward } = useForContentRendering(data, null, 9)

    const renderArticles = () => sourcesParts?.map((item, idx) => item?.media && <RenderArticle key={item._id} item={item} />)

    return (
        <section>            
            <div className="columns-3 px-2 gap-3 mb-6">
                {renderArticles()}
            </div>
            <PaginationsButtons handleForward={handleForward} handleBackward={handleBackward} />
        </section>
    )
}

export const RenderArticle = ({ item }) => {
    // const { excerpt, link, media, summary, title } = item
    const { content, description, image_url, link, title } = item

    const ref = useRef()

    const handleOnError = () => ref.current.src = `https://source.unsplash.com/random/200?news`

    return (
        <div className="mb-6 text-justify text-slate-400 flex flex-col gap-0 outline-2 outline-double outline-blue-600 rounded-lg">
            <Link className="" href={link} target="_blank">
                <h2 className="text-2xl p-2 font-bold bg-gray-950 opacity-90">{title}</h2>
            </Link>
            <img ref={ref} className="h-48" src={image_url} alt={title} onError={handleOnError} />

            <div className="bg-gray-800 opacity-90 px-2">
                <RenderArticleMetaData item={item} />
            </div>
            <div className="bg-gray-800 opacity-90 px-2 text-xl font-bold">
                <RenderContent text={description} label={"Excerpt"} ftype={true} />
            </div>
            {/* <img className="h-48" src={media} alt={excerpt} /> */}
            <div className="bg-gray-800 opacity-90 px-2 text-xl font-semibold">
                <RenderContent text={content} label={"Story"} ftype={true} />
            </div>
        </div>
    )
}

const RenderArticleMetaData = ({ item }) => {
    const {
        creator, country, language, pubDate,
        category, source_id, link, source_priority
    } = item

    return (
        <div className="bg-gray-900 opacity-90 text-stone-400 font-light">
            <ReUsableContentRenderer>
                <RenderContent text={creator ? creator[0] : "N/A"} label={"By"} />
                <RenderContent text={category ? category[0] : "unknown".toUpperCase()} label={"Category"} />
                <RenderContent text={source_priority} label={"Rank"} />
            </ReUsableContentRenderer>
            <ReUsableContentRenderer>
                <RenderContent text={country ? country[0] : "Bangladesh".toUpperCase()} label={"Country"} />
                <RenderContent text={(language || "en").toUpperCase()} label={"Langugae"} />
                {/* <RenderContent text={twitter_account} label={"Twitter"} /> */}
            </ReUsableContentRenderer>
            <ReUsableContentRenderer>
                <RenderContent text={source_id} label={"Rights"} />
                <RenderContent text={new Date(pubDate).toLocaleDateString()} label={"Published On"} />
                <RenderContent text={link} label={"Link"} />
            </ReUsableContentRenderer>
        </div>
    )
}

const ReUsableContentRenderer = ({ children, test }) => {
    return (
        <p className="flex gap-2 justify-between w-full">
            {children}
        </p>
    )
}

const RenderContent = ({ text, label, ftype }) => <span className={`flex ${ftype ? "flex-col" : "flex-row"} gap-2 text-lg`}><span>{label} : </span><span>{text || "N/A"}</span></span>

export const PaginationsButtons = ({ handleForward, handleBackward }) => {
    const btns = [{ name: "Prev", handler: handleBackward }, { name: "Next", handler: handleForward }]
    const renderBtns = () => btns?.map(item => <RenderButton key={item.name} item={item} />);

    return (
        <div className='flex gap-4 w-full justify-center'>
            {renderBtns()}
        </div>
    )
}

const RenderButton = ({ item }) => {
    const { name, handler } = item;

    return (
        <button className='p-2 bg-sky-400 rounded-md' onClick={handler}>{name}</button>
    )
}