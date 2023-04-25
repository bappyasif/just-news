import { restructureAllUsedFilters } from "@/utils"
import Link from "next/link"

export const RenderFiltersInUse = ({ data }) => {
    const dataset = restructureAllUsedFilters(data)

    const renderFilters = () => dataset?.map((item, idx) => <RenderFilter key={idx} item={item} />)

    return (
        <div className='text-xl bg-zinc-400 w-fit px-2'>
            <h2 className='text-2xl'>Filters In Use</h2>
            <ul className='flex gap-4 '>
                {renderFilters()}
            </ul>
        </div>
    )
}

const RenderFilter = ({ item }) => {
    const { name, vals } = item;

    // console.log(item, "item!!")

    console.log(vals)

    if (vals == null || vals?.length == 0) return null

    if (name == "from" || name == "page") return null

    return (
        <li>
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
    const renderArticles = () => data?.map((item, idx) => idx <= 6 && <RenderArticle key={item._id} item={item} />)

    return (
        <section>
            <h2>News Snippets</h2>
            <div className="columns-3 px-2 gap-3 mb-6">
                {renderArticles()}
            </div>
            <PaginationsButtons handleForward={() => console.log("forward")} handleBackward={() => console.log("backward") } />
        </section>
    )
}

const RenderArticle = ({ item }) => {
    const { excerpt, link, media, summary, title } = item

    return (
        <div className="mb-6 text-justify text-slate-400 flex flex-col gap-0 outline-2 outline-double outline-blue-600 rounded-lg">
            <Link className="" href={link} target="_blank">
                <h2 className="text-2xl p-2 font-bold bg-gray-950 opacity-90">{title}</h2>
            </Link>
            {/* <RenderArticleMetaData item={item} />
            <RenderContent text={excerpt} label={"Excerpt"} ftype={true} />
            <img className="w-fit" src={media} alt={excerpt} />
            <RenderContent text={summary} label={"Summary"} ftype={true} /> */}
            <div className="bg-gray-800 opacity-90 px-2">
                <RenderArticleMetaData item={item} />
            </div>
            <div className="bg-gray-800 opacity-90 px-2 text-xl font-bold">
                <RenderContent text={excerpt} label={"Excerpt"} ftype={true} />
            </div>
            <img className="w-fit" src={media} alt={excerpt} />
            <div className="bg-gray-800 opacity-90 px-2 text-xl font-semibold">
                <RenderContent text={summary} label={"Summary"} ftype={true} />
            </div>
        </div>
    )
}

const RenderArticleMetaData = ({ item }) => {
    const {
        author, country, language, published_date,
        rank, topic, twitter_account
    } = item

    return (
        <div className="bg-gray-800 opacity-90">
            <ReUsableContentRenderer>
                <RenderContent text={author} label={"By"} />
            </ReUsableContentRenderer>
            <ReUsableContentRenderer>
                <RenderContent text={country.toUpperCase()} label={"Country"} />
                <RenderContent text={language.toUpperCase()} label={"Langugae"} />
                <RenderContent text={topic.toUpperCase()} label={"Topic"} />
            </ReUsableContentRenderer>
            <ReUsableContentRenderer>
                <RenderContent text={new Date(published_date).toLocaleDateString()} label={"Published On"} />
                <RenderContent text={twitter_account} label={"Twitter"} />
                <RenderContent text={rank} label={"Rank"} />
            </ReUsableContentRenderer>
        </div>
    )
}

const ReUsableContentRenderer = ({ children, test }) => {
    return (
        <p className="flex gap-2">
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