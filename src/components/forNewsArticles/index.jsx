import React from 'react'
import { PaginationsButtons, RenderArticle, RenderFiltersInUse } from '../shared/forDataRendering'
import { useForContentRendering } from '@/hooks'

export const ShowAllArticlesData = ({list, filtersUsed}) => {
    filtersUsed.size = list?.length
  return (
    <main>
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
          <div className="xs:columns-1 md:columns-2 xl:columns-3 px-2 gap-3 mb-6">
              {renderArticles()}
          </div>
          <PaginationsButtons handleForward={handleForward} handleBackward={handleBackward} />
      </section>
  )
}
