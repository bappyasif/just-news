import React from 'react'
import { RenderFiltersInUse } from '../shared/forDataRendering'

export const ShowAllSavedFilters = ({ data }) => {
    const renderFilters = () => data?.map(item => <RenderFiltersInfo key={item?.name} item={item} btnText={"See News Based On These Filters"} />)
    return (
        <div>
            <div className='bg-slate-400 mb-4 w-fit px-4'>Showing All Saved Filters</div>
            <section className='columns-2 w-full'>
                {renderFilters()}
            </section>
        </div>
    )
}

const RenderFiltersInfo = ({ item, btnText }) => {
    const { name, type, user_input } = item

    return (
        <div className='px-2 text-2xl bg-slate-600 opacity-90 flex flex-col gap-2 py-2'>
            <h2><span className='bg-zinc-800 text-stone-200 px-2 mr-2'>Filter Name:</span><span className='bg-blue-600 text-slate-950 px-2'>{name}</span></h2>
            <h3><span className='bg-zinc-800 text-stone-200 px-2 mr-1'>Filter Type:</span> <span className='bg-blue-400 px-2'>For {type}</span></h3>
            <RenderFiltersInUse data={user_input} />
            <button className='bg-cyan-400 text-gray-950 font-bold p-2 py-1 rounded-sm'>{btnText}</button>
        </div>
    )
}
