import React from 'react'
import { RenderFiltersInUse, RenderNewsArticles } from '../shared/forDataRendering'

export const ShowAllArticlesData = ({list, filtersUsed}) => {
    console.log(list, filtersUsed)
  return (
    <main>
      <div>ShowAllArticlesData</div>
      <RenderFiltersInUse data={filtersUsed} />
      <RenderNewsArticles data={list} />
    </main>
  )
}
