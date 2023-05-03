import React from 'react'
import { RenderFiltersInUse } from '../shared/forDataRendering'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { happensAfterHttpRequest, makeRoutes } from '@/utils'
import { MdDeleteForever } from 'react-icons/md'
import { useAppContext } from '@/hooks'
import { AppContext } from '@/contexts'

export const ShowAllSavedFilters = ({ data }) => {
    const forHeadlines = data?.filter(item => item?.type === "Headlines" && item)
    const forSources = data?.filter(item => item?.type === "Sources" && item)
    const forNews = data?.filter(item => item?.type === "News" && item)

    const renderableData = [
        {
            data: forHeadlines,
            text: "Saved Filter For Headlines"
        },
        {
            data: forSources,
            text: "Saved Filter For Sources"
        },
        {
            data: forNews,
            text: "Saved Filter For News"
        }
    ]

    const renderAllFiltersData = () => renderableData?.map(item => <RenderSpecificTypeFilters key={item?.text} text={item?.text} data={item?.data} />)

    return (
        <div>
            <div className='bg-slate-400 opacity-80 mb-4 w-full px-4 text-6xl text-center'>Showing All Saved Filters When There Is Any</div>
            {
                data?.length
                    ? renderAllFiltersData()
                    : <RenderLinksWhenNoDataAvailable />
            }
        </div>
    )
}

const RenderLinksWhenNoDataAvailable = () => {
    const linksData = [
        { name: "Sources", path: "/sources" },
        { name: "Headlines", path: "/headlines" },
        { name: "News", path: "/news" }
    ];

    const renderLinks = () => linksData?.map(item => <Link className='bg-blue-400 text-gray-950 text-xl font-bold px-2' key={item?.name} href={item?.path}>{item.name}</Link>)

    return (
        <div className='text-2xl font-semibold bg-slate-400 opacity-90 w-fit px-4 py-2'>
            <h2>No Saved Filters Found Yet, Add Some From These</h2>
            <div className='flex gap-4'>
                {renderLinks()}
            </div>
        </div>
    )
}

const RenderSpecificTypeFilters = ({ text, data }) => {
    const renderInfo = () => data?.map(item => <RenderFiltersInfo key={item?.name} item={item} />)
    return (
        data?.length
            ?
            <section className='w-full'>
                <div className='flex justify-center'>
                <h2 className='bg-slate-800 opacity-90 text-stone-400 my-4 px-4 text-4xl w-2/4 text-center'>{text}</h2>
                </div>
                <div className='flex justify-evenly gap-4 flex-wrap'>
                    {renderInfo()}
                </div>
            </section>
            : null
    )
}

const RenderFiltersInfo = ({ item }) => {
    const { name, type, user_input, _id } = item

    const router = useRouter();

    const makeShallowUrl = () => {
        router.push(`${type.toLowerCase()}?${makeRoutes(user_input)}`, undefined, { shallow: true })
    }

    const decideBtnText = () => `See ${type === "News" ? "News" : type === "Headlines" ? "Headlines" : type === "Sources" ? "Sources" : null} Based On These Filters`

    return (
        <div className='w-1/3 px-2 text-2xl bg-slate-600 opacity-90 flex flex-col gap-2 py-2'>
            <div className='flex gap-4 justify-between'>
                <div>
                    <h2><span className='bg-zinc-800 text-stone-200 px-2 mr-2'>Filter Name:</span><span className='bg-stone-700 text-stone-200 px-2'>{name}</span></h2>
                    <h3><span className='bg-zinc-800 text-stone-200 px-2 mr-1'>Filter Type:</span> <span className='bg-zinc-700 text-stone-200 px-2'>For {type}</span></h3>
                </div>
                <DeleteThisSavedFilter filterId={_id} />
            </div>
            {/* <h2><span className='bg-zinc-800 text-stone-200 px-2 mr-2'>Filter Name:</span><span className='bg-blue-600 text-slate-950 px-2'>{name}</span></h2>
            <h3><span className='bg-zinc-800 text-stone-200 px-2 mr-1'>Filter Type:</span> <span className='bg-blue-400 px-2'>For {type}</span></h3> */}
            <RenderFiltersInUse data={user_input} />
            <button onClick={makeShallowUrl} className='bg-stone-500 text-gray-950 font-bold p-2 py-1 rounded-lg'>{decideBtnText()}</button>
        </div>
    )
}

const DeleteThisSavedFilter = ({ filterId }) => {
    const {handleDeleteSavedFilter} = useAppContext(AppContext)
    
    const dataUpdater = () => handleDeleteSavedFilter(filterId)
    
    const handleDelete = () => {
        const url = "/forNews"
        const method = "DELETE"
        const params = { filter_id: filterId }
        happensAfterHttpRequest( dataUpdater, { url, method, params })
    }
    return (
        <button 
            onClick={handleDelete}
            className='bg-rose-950 text-stone-400 font-extrabold text-2xl px-2 w-1/4 m-auto flex flex-col items-center rounded-xl'
        >
            <p>Delete?</p>
            <span className='text-3xl text-red-600'><MdDeleteForever /></span>
        </button>
    )
}