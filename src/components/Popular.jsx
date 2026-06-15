import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import PageHeader from './templates/PageHeader'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Popular = () => {
  document.title = 'Popular - NEXA'

  const [category, setCategory] = useState('movie')
  const [popular, setPopular] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular`, {
        params: { page },
      })
      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setPopular([])
    setPage(1)
    setHasMore(true)
  }, [category])

  useEffect(() => {
    if (popular.length === 0 && hasMore) {
      getPopular()
    }
  }, [popular, category])

  return (
    <div id="popular-scroll" className="bg-[#0D0D0D] min-h-screen overflow-y-auto">
      <PageHeader
        title="Popular"
        dropdowns={[
          {
            title: 'Category',
            options: ['movie', 'tv'],
            func: (e) => setCategory(e.target.value),
          },
        ]}
      />

      {popular.length > 0 ? (
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={<p className="text-center text-zinc-400 py-6 text-sm">Loading more...</p>}
          scrollableTarget="popular-scroll"
        >
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Popular