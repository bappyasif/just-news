import { useForLiveSearches } from "@/hooks"
import { checkIfProfanityExists, decideRoutePath, decideWhich, makeRoutes } from "@/utils"
import { useRouter } from "next/router"
import { MdDoubleArrow } from "react-icons/md"

export const AppHeadline = () => {
    return (
        <div className="text-4xl text-center mb-3 bg-slate-400 text-zinc-950 font-extrabold opacity-80">
            <h1 className="bg-blue-950 text-stone-200">Want To Look Into News Snippet From All Over This Planet?</h1>
            <h2>You are in a good place, you will find them all in here and more, enjoy :)</h2>
        </div>
    )
}

export const ShowAllLiveSearches = () => {
    const dataset = [
        { type: "q", titleText: "Live News Search Query" },
        { type: "sources", titleText: "Live News Source Search" }
    ]

    const renderData = () => dataset.map((item, idx) => <RenderLiveSearchData key={item.type} type={item.type} titleText={item.titleText} />);

    return (
        <div className="flex gap-4 xxs:w-full lg:w-3/4">
            {renderData()}
        </div>
    )
}

const RenderLiveSearchData = ({type, titleText}) => {
    const demoData = {q: [{ text: "world" }, { text: "political" }, {text: "standpoints"}], sources: [{ text: "wsj.com" }, { text: "wire.com" }]}
    const { results } = useForLiveSearches(type)
    return (
        <div className="w-full">
            <RenderAllSearchTerms type={type} data={results?.length ? results : demoData[type]} titleText={titleText} />
        </div>
    )
}

const RenderAllSearchTerms = ({ data, titleText, type }) => {
    const renderSearchTerms = () => data.map((item, idx) => <RenderSearchTerm key={item?.text + idx} text={item?.text} type={type} />)
    return (
        <div className="w-full bg-slate-800 opacity-90 h-full">
            <RenderSomeHeaderText titleText={titleText} />
            <div className="flex gap-2 flex-wrap mt-2">
                {renderSearchTerms()}
            </div>
        </div>
    )
}

const RenderSearchTerm = ({ text, type }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${decideRoutePath(type)}?${makeRoutes(decideWhich(type, text))}`, undefined, { shallow: true })
    }

    return (
        <button onClick={handleClick} className="bg-blue-400 hover:bg-blue-500 hover:text-stone-300 px-5 py-1 rounded-full">{checkIfProfanityExists(text)}</button>
    )
}

const RenderSomeHeaderText = ({ titleText }) => {
    return (
        <h2 className="bg-slate-600 text-slate-950 font-extrabold px-2">{titleText}</h2>
    )
}

export const LandingPageContentRendering = () => {
    const introTexts = [
        "You will find a wide range of topics, including politics, business, technology, entertainment, sports, and more",
        "Whether you're looking for breaking news, in-depth analysis, or thought-provoking features, you will find it from 'Search News' and 'News Headlines'",
        "From Search News you can 'search' through news as you look and filter through in filters 'modal'",
        "From News Headlines you will get comb through news headlines, and you can also tune up your search from filters",
        "From Sources you will find who are available 'news providers' that data mined from and curated for news snippets",
        "From Saved Filters You can store your searched news and sources for to use them to get fresh info fro them just by a 'single click!!",
        `All in all this is your go-to source for the latest and most comprehensive news from around the world, happy news searching y'all :)`
    ];

    const ctaTexts = [
        "Totally free News Snippets",
        "You Can Use Filters Modal, which is a pop up and can be toggled when needed",
        `Filters Modal is available In "Search News", "Headlines News" and "News Sources"`,
        `There is a Special Perk for Logged In user is that they can save "filters" used in ther searching for news , headlines or sources, so that they can directly look at them at some later time of their choosing and see info based on those filters`
    ];

    return (
        <section className="w-full">
            <RenderTexts titleText={"Just News App In-A-Nutshell"} descTexts={introTexts} />
            <RenderTexts titleText={"Just News App Call-To-Action"} descTexts={ctaTexts} />
        </section>
    )
}

const RenderTexts = ({ titleText, descTexts }) => {
    const renderTexts = () => descTexts.map(text => <p key={text} className="px-2 text-slate-400 flex gap-2 items-center"><span className="text-2xl"><MdDoubleArrow /></span> <span>{text}</span></p>)

    return (
        <div className="bg-slate-800 opacity-90 mb-2">
            <RenderSomeHeaderText titleText={titleText} />
            <div className="flex flex-col gap-2">
                {renderTexts()}
            </div>
        </div>
    )
}