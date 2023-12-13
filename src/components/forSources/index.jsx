import React from 'react'
import { PaginationsButtons, RenderFiltersInUse } from '../shared/forDataRendering';
import { useForContentRendering } from '@/hooks';

export const RenderAllNewsSources = ({ sources, filtersInUse }) => {
  const {sourcesParts, handleBackward, handleForward} = useForContentRendering(sources, null, 100)

  console.log(sources, sourcesParts, "wht wht!!", filtersInUse)

  return (
    <section className='flex flex-col gap-y-5 mt-4'>
      <RenderFiltersInUse data={filtersInUse} />
      <RenderSources data={sourcesParts?.length ? sourcesParts : sources?.length ? sources : []} />
      {/* <PaginationsButtons handleBackward={handleBackward} handleForward={handleForward} /> */}
    </section>
  )
}

const RenderSources = ({ data }) => {
  // const renderNames = () => data?.map(item => <li className='px-4 bg-gray-400 hover:bg-gray-600 py-2 h-fit rounded-sm' key={item}>{item}</li>)

  const renderNames = () => data?.map(item => {
    const {name, language, url, description} = item;
    return (
      <li className='px-4 duration-1000 transition-all bg-gray-400 hover:bg-gray-600 py-2 h-fit rounded-md flex flex-col gap-y-1.5 justify-center items-center mb-4' key={name}>
        <h2 className='font-bold text-2xl capitalize'>{name}</h2>
        
        <h3 className='text-xs text-slate-800 flex gap-2 justify-between w-full'><span className='font-semibold'>Language:</span><span className='w-3/4 font-bold capitalize text-left'>{language[0]}</span></h3>

        <a className='font-semibold text-lg text-blue-600 hover:text-blue-400 flex gap-2 justify-between w-full' target='_blank' href={url}><span className='font-semibold'>Website:</span><span className='w-3/4'>{url}</span></a>
        
        <h5 className='font-semibold text-sm flex gap-2 justify-between w-full'><span className='font-semibold'>Description:</span><span className='w-3/4'>{description}</span></h5>
      </li>
    )
  })

  return (
    <ul 
      // className='flex gap-2 justify-start flex-wrap' 
      className='columns-1 md:columns-2 lg:columns-3 gap-4 px-2'
      style={{minHeight: "710px"}}
    >
      {renderNames()}
    </ul>
  )
}