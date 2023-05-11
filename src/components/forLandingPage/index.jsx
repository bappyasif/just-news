import { categories, navLinks } from "@/data"
import { useForLiveSearches } from "@/hooks"
import { checkIfProfanityExists, decideRoutePath, decideWhich, makeRoutes } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Children, useEffect, useState } from "react"
import { MdDoubleArrow, MdForward } from "react-icons/md"
import demo from "../../../public/newspapersPile.jpg"
import { FaBackward, FaForward } from "react-icons/fa"
import { useSession } from "next-auth/react"

export const AppHeadline = () => {
    return (
        <div className="text-4xl text-center mb-3 bg-slate-400 text-zinc-950 font-extrabold opacity-80">
            <h1 className="bg-blue-950 text-stone-200">Want To Look Into News Snippets From All Over This Planet?</h1>
            <h2>You are in a good place, you will find them all in here and more, enjoy :)</h2>
        </div>
    )
}

export const NewsCategories = () => {
    const [dataset, setDataset] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({})

    const handleCategoryInfo = data => setCategoryInfo(data)

    const findIdx = (name) => dataset.findIndex(item => item.name === name)

    const handleNext = (data) => {
        const idx = findIdx(categoryInfo?.name);

        if (idx < dataset?.length - 1 && idx >= 0) {
            handleCategoryInfo(dataset[idx + 1])
        } else if (idx === -1) {
            handleCategoryInfo(dataset[dataset.length - 1])
        }
    }

    const handlePrev = () => {
        const idx = findIdx(categoryInfo?.name);

        if (idx > 0 && idx < dataset.length) {
            handleCategoryInfo(dataset[idx - 1])
        }
    }

    const handleThumbnailClick = (name) => {
        const findItem = dataset.find(item => item.name === name);
        handleCategoryInfo(findItem)
    }

    const handleCarousel = {
        next: handleNext,
        prev: handlePrev,
        thumb: handleThumbnailClick
    }

    useEffect(() => {
        setDataset(categories)
        handleCategoryInfo(categories[0])
    }, [])

    // console.log(categoryInfo, "categoryInfo!!")

    return (
        <section className="xxs:w-full lg:w-3/4 m-auto bg-slate-900 px-4 opacity-80 pb-1">
            <h2 className="xxs:text-2xl xl:text-5xl text-slate-400 mb-2">News Categories</h2>
            <SoloCategory handleCarousel={handleCarousel} categoryInfo={categoryInfo} />
            <RenderThumbnails handleCarousel={handleCarousel} categories={dataset} categoryInfo={categoryInfo} />
        </section>
    )
}

const SoloCategory = ({ handleCarousel, categoryInfo }) => {
    const { name, text } = categoryInfo;
    const handleHref = () => name === "News" ? "/headlines" : `/news?q=${name}`
    const router = useRouter();
    const handleRouter = () => router.push(handleHref())
    return (
        <CarouselView handleCarousel={handleCarousel}>
            <Image
                onClick={handleRouter}
                className="w-full hover:cursor-pointer h-40"
                src={`/${name}.jpg`}
                height={330}
                width={290}
                alt="what up!!"
            />
            <div
                className="absolute top-2 bg-slate-900 text-slate-200 px-4 py-2 w-full"
            >
                <Link href={handleHref()}>
                    <p className="w-fit text-center xxs:text-2xl lg:text-4xl">{name}</p>
                    {/* <p>{text}</p> */}
                </Link>
            </div>
        </CarouselView>
    )
}

const CarouselView = ({ children, handleCarousel }) => {
    return (
        <div className="flex justify-between my-4 h-40 gap-4 relative xxs:text-xl md:2xl">
            <button
                onClick={handleCarousel.prev}
                className="text-slate-200 bg-slate-950 hover:bg-slate-800 flex gap-2 justify-center items-center px-2"
            >{<FaBackward />}Prev</button>
            <div className="flex flex-col mb-4 relative grow">
                {children}
            </div>
            <button
                onClick={handleCarousel.next}
                className="text-slate-200 bg-slate-950 hover:bg-slate-800 px-2 flex gap-2 justify-center items-center"
            >Next {<FaForward />}</button>
        </div>
    )
}

const RenderThumbnails = ({ categoryInfo, categories, handleCarousel }) => {
    const renderCategories = () => categories.map(item => <RenderCategory key={item.name} item={item} categoryInfo={categoryInfo} handleCarousel={handleCarousel} />)
    return (
        <div className="flex gap-4 flex-wrap justify-center mb-4">
            {renderCategories()}
        </div>
    )
}

const RenderCategory = ({ item, categoryInfo, handleCarousel }) => {
    const { name, picture } = item;

    return (
        <div
            onClick={() => handleCarousel?.thumb(name)}
            className={`relative w-24 h-14 flex flex-col items-center justify-center rounded-lg outline-4 ${categoryInfo?.name === name ? "outline-rose-600" : "outline-rose-950"} outline hover:cursor-pointer`}
        >
            <Image
                className="w-full h-full"
                src={`/${name}.jpg`}
                height={92}
                width={92}
            />
            <span className={`absolute text-xs font-extrabold text-gray-200 bg-slate-600 px-2 rounded-lg`}>{name}</span>
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
        <div className="flex gap-4 xxs:w-full lg:w-3/4 mb-2">
            {renderData()}
        </div>
    )
}

const RenderLiveSearchData = ({ type, titleText }) => {
    const demoData = { q: [{ text: "world" }, { text: "political" }, { text: "standpoints" }], sources: [{ text: "wsj.com" }, { text: "wire.com" }] }
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
        <h2 className="bg-slate-600 text-slate-950 font-extrabold px-2 text-center">{titleText}</h2>
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
            <VisitNewsRelatedRoutes />
        </div>
    )
}

const VisitNewsRelatedRoutes = ({ }) => {
    const renderLinks = () => navLinks.map(item => <RenderLink key={item.name} item={item} />)

    return (
        <div className="flex items-center justify-center gap-4 py-2 px-2">
            <p className="text-cyan-600">Quick Access:</p>
            <div className="flex gap-2">
                {renderLinks()}
            </div>
        </div>
    )
}

const RenderLink = ({ item }) => {
    const { name, path, icon } = item;
    const [showTip, setShowTip] = useState(false);

    const handleShow = () => setShowTip(true)

    const handleHide = () => setShowTip(false)

    const {data: session} = useSession()

    if(session?.user && name === "Sign in") {
        return null
    }

    return (
        <div className="relative">
            <Link
                onMouseEnter={handleShow} onMouseLeave={handleHide}
                href={path}
                className="flex gap-2 bg-slate-950 p-2 rounded-full"
            >
                <span className="text-slate-400">{icon}</span>
            </Link>
            {
                showTip ?
                    <p className="absolute bg-white bottom-10 min-w-max px-2 z-50">{name}</p>
                    : null
            }
        </div>
    )
}