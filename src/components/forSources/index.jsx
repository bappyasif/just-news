import React from 'react'
import { PaginationsButtons, RenderFiltersInUse } from '../shared/forDataRendering';
import { useForContentRendering } from '@/hooks';
import { useRouter } from 'next/router';

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

  const router = useRouter()

  const handleClick = (url) => {
    // const pathname = router.basePath
    // const
    // const token = url.split("https://")[1]
    const token = url.split(/https:\/\/|http:\/\//)[1]
    const wwwToken = token.split("www.")[1]
    const nextRound = wwwToken.split("/")[0]
    // console.log(wwwToken, "www")

    router.push(`/news?domainurl=${nextRound}`, undefined, { shallow: true })

    // router.push(`/news?domainurl=nytimes.com`, undefined, { shallow: true })
    // router.push()
  }

  const renderNames = () => data?.map(item => {
    const {name, language, url, description} = item;
    return (
      <li className='px-4 bg-gray-400 py-2 h-fit rounded-md flex flex-col gap-y-1.5 justify-center items-center mb-4' key={name}>
        <h2 className='font-bold text-2xl capitalize'>{name}</h2>
        
        <h3 className='text-sm text-blue-600 flex gap-2 justify-between w-full'><span className='font-semibold'>Language:</span><span className='w-3/4 font-bold capitalize text-left'>{language[0]}</span></h3>

        <a className='font-semibold text-sm text-blue-600 hover:text-blue-400 flex gap-2 justify-between w-full' target='_blank' href={url}><span className='font-semibold'>Website:</span><span className='w-3/4'>{url}</span></a>
        
        <h5 className='font-semibold text-sm flex gap-2 justify-between w-full'><span className='font-semibold'>Description:</span><span className='w-3/4'>{description}</span></h5>

        <button className='font-bold text-lg w-full text-center text-blue-900 bg-slate-200 duration-1000 transition-all hover:bg-slate-600 hover:text-blue-200' onClick={() => handleClick(url)}>See News From Them</button>
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