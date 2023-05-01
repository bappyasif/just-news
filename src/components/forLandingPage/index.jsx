import { MdDoubleArrow } from "react-icons/md"

export const AppHeadline = () => {
    return (
        <div className="text-4xl text-center mb-3 bg-slate-400 text-zinc-950 font-extrabold opacity-80">
            <h1 className="bg-blue-950 text-stone-200">Want To Look Into News Snippet From All Over This Planet?</h1>
            <h2>You are in a good place, you will find them all in here and more, enjoy :)</h2>
        </div>
    )
}

export const ReturningUserNewsSearches = () => {
    const searchTerms = ["test search query term", "another test Search query"]
    return (
        <div className="w-1/2">
            <RenderAllSearchTerms data={searchTerms} titleText={"News Searched By User"} />
        </div>
    )
}

export const PopularSearches = () => {
    const searchTerms = ["popular search", "another popular search"]

    return (
        <div className="w-1/2">
            <RenderAllSearchTerms data={searchTerms} titleText={"Live search goes here"} />
        </div>
    )
}

const RenderAllSearchTerms = ({ data, titleText }) => {
    const renderSearchTerms = () => data.map(text => <RenderSeachTerm key={text} text={text} />)
    return (
        <div className="w-full bg-slate-800 opacity-90 h-full">
            <RenderSomeHeaderText titleText={titleText} />
            <div className="flex gap-2 flex-wrap mt-2">
                {renderSearchTerms()}
            </div>
            {/* <RenderTexts titleText={"Popular search goes here"} descTexts={} /> */}
        </div>
    )
}

const RenderSeachTerm = ({ text }) => {
    return (
        <button className="bg-blue-400 px-5 py-1 rounded-full">{text}</button>
    )
}

const RenderSomeHeaderText = ({ titleText }) => {
    return (
        <h2 className="bg-slate-600 text-slate-950 font-extrabold px-2">{titleText}</h2>
    )
}

export const LandingPageContentRendering = () => {
    // const headlineTexts = [
    //     // `<h1>Want To Look Into News Snippet From All Over This Planet?</h1>`
    //     `You are in a good place, you will find them all in here and more, enjoy :)`
    //     // ":&lt;h2&gt;test&lt;/h2&gt;"
    // ];

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
            {/* <RenderTexts titleText={"Want To Look Into News Snippet From All Over This Planet?"} descTexts={headlineTexts} /> */}
            <RenderTexts titleText={"Just News App In-A-Nutshell"} descTexts={introTexts} />
            <RenderTexts titleText={"Just News App Call-To-Action"} descTexts={ctaTexts} />
        </section>
    )
}

const RenderTexts = ({ titleText, descTexts }) => {
    const renderTexts = () => descTexts.map(text => <p className="px-2 text-slate-400 flex gap-2 items-center"><span className="text-2xl"><MdDoubleArrow /></span> <span>{text}</span></p>)

    return (
        <div className="bg-slate-800 opacity-90 mb-2">
            <RenderSomeHeaderText titleText={titleText} />
            {/* <h2 className="bg-slate-600 text-slate-950 font-extrabold px-2">{titleText}</h2> */}
            {/* <ul>
                {renderTexts()}
            </ul> */}
            <div className="flex flex-col gap-2">
                {renderTexts()}
            </div>
        </div>
    )
}