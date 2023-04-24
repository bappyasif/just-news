import { restructureAllUsedFilters } from '@/utils';
import React, { useEffect, useState } from 'react'

export const RenderAllNewsSources = ({ sources, filtersInUse }) => {
  const [arrParts, setArrParts] = useState({from: 0, to: 100});
  const [sourcesParts, setSourcesParts] = useState();

  // const handlePaginations = (action) => action === "fwd" ? setArrParts(prev => prev + 1) : action === "bck" ? setArrParts(prev => prev - 1) : null

  const handleForward = () => {
    // console.log("forward!!", arrParts <= sources?.length && arrParts >= 0, arrParts <= sources?.length, arrParts >= 0, sources?.length, arrParts)
    if (arrParts?.to <= sources?.length && arrParts?.to >= 0) {
      // let to = 0
      // console.log("forward - 2!!")
      if(sources.length - arrParts?.to >= 100) {
        // console.log("if block")
        setArrParts(prev => {
          // console.log(prev.to + 100, typeof prev.to + 100)
          return {
            from: prev?.to,
            to: prev.to + 100
          }
        })
      } else {
        // console.log("else block")
        setArrParts(prev => {
          const nextTo = prev.to + (sources.length - prev.to)
          if(nextTo > prev.to) {
            return {
              from: prev.to,
              to: prev.to + (sources.length - prev.to)
            }
          } else {
            return {
              from: prev.from,
              to: prev.to
            }
          }
        })
      }
    }
  }

  const handleBackward = () => {
    if (arrParts?.to <= sources?.length && arrParts?.to >= 0) {
      if(sources.length - arrParts?.from >= 100 && arrParts?.from > 0) {
        setArrParts(prev => {
          // console.log(prev.to + 100, typeof prev.to + 100)
          return {
            from: prev.from - 100,
            to: prev.from
          }
        })
      } else {
        setArrParts(prev => {
          const nextFrom = prev.from - (sources.length - prev.from)
          if(nextFrom < prev.from && nextFrom > 0) {
            return {
              from: nextFrom,
              to: prev.to - (sources.length - prev.to)
            }
          } else {
            return {
              from: prev.from,
              to: prev.to
            }
          }
        })
      }
    }
  }

  const handleSourcesParts = () => {
    const from = arrParts?.from
    const to = arrParts?.to

    console.log(from, to, sources?.filter((v, i) => i >= from && i < to && v))
    
    setSourcesParts(sources?.filter((v, i) => i >= from && i < to && v))
  }

  useEffect(() => {
    handleSourcesParts()
  }, [arrParts])

  console.log(sources, filtersInUse, sources?.length, sources[0])

  return (
    <section className='flex flex-col gap-2'>
      <div>RenderAllNewsSources</div>
      <RenderFiltersInUse data={filtersInUse} />
      {/* <RenderSources data={sources[arrParts]} /> */}
      <RenderSources data={sourcesParts} />
      <PaginationsButtons handleBackward={handleBackward} handleForward={handleForward} />
    </section>
  )
}

const PaginationsButtons = ({ handleForward, handleBackward }) => {
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

const RenderSources = ({ data }) => {
  // const renderNames = () => [data]?.map((item, idx) => <li key={idx}>{Object.values(item)[0]}</li>)
  const renderNames = () => data?.map(item => <li className='px-4 bg-gray-400 py-2 h-fit rounded-sm' key={item}>{item}</li>)



  return (
    <ul className='flex gap-2 justify-start flex-wrap' style={{minHeight: "710px"}}>
      {renderNames()}
    </ul>
  )
}

const RenderFiltersInUse = ({ data }) => {
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