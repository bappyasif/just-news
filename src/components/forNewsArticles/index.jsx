import React from 'react'
import { PaginationsButtons, RenderArticle, RenderFiltersInUse } from '../shared/forDataRendering'
import { useForContentRendering } from '@/hooks'

export const ShowAllArticlesData = ({list, filtersUsed}) => {
    console.log(list, filtersUsed)
    filtersUsed.size = list?.length
  return (
    <main>
      <div>ShowAllArticlesData</div>
      <RenderFiltersInUse data={filtersUsed} />
      <RenderNewsArticles data={list} />
    </main>
  )
}

const RenderNewsArticles = ({ data }) => {
  const {sourcesParts, handleBackward, handleForward} = useForContentRendering(data, null, 9)

  const renderArticles = () => sourcesParts?.map((item) => item?.author && item?.media && <RenderArticle key={item._id} item={item} />)

  return (
      <section>
          {/* <ReUseableContentRendering sources={data} initialDatasetCounts={{from: 0, to: 20}}>

          </ReUseableContentRendering> */}
          <h2>News Snippets</h2>
          <div className="columns-3 px-2 gap-3 mb-6">
              {renderArticles()}
          </div>
          <PaginationsButtons handleForward={handleForward} handleBackward={handleBackward} />
      </section>
  )
}
