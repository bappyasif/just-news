import React from 'react'
import { PaginationsButtons, RenderFiltersInUse } from '../shared/forDataRendering';
import { useForContentRendering } from '@/hooks';

export const RenderAllNewsSources = ({ sources, filtersInUse }) => {
  const {sourcesParts, handleBackward, handleForward} = useForContentRendering(sources, null, 100)

  return (
    <section className='flex flex-col gap-2'>
      <div>RenderAllNewsSources</div>
      <RenderFiltersInUse data={filtersInUse} />
      <RenderSources data={sourcesParts} />
      <PaginationsButtons handleBackward={handleBackward} handleForward={handleForward} />
    </section>
  )
}

const RenderSources = ({ data }) => {
  // const renderNames = () => [data]?.map((item, idx) => <li key={idx}>{Object.values(item)[0]}</li>)
  // console.log(data, "what data!!>><<!!")
  const renderNames = () => data?.map(item => <li className='px-4 bg-gray-400 py-2 h-fit rounded-sm' key={item}>{item}</li>)



  return (
    <ul className='flex gap-2 justify-start flex-wrap' style={{minHeight: "710px"}}>
      {renderNames()}
    </ul>
  )
}