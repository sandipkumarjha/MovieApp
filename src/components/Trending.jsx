import React, { useEffect, useState } from 'react'
import PageHeader from './templates/PageHeader'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  document.title = 'Trending - NEXA'

  const [Category, setCategory] = useState('all')
  const [duration, setduration] = useState('day')
  const [trending, settrending] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${Category}/${duration}?page=${page}`
      )
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results])
        setpage((prev) => prev + 1)
      } else {
        sethasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const refreshhandler = () => {
    setpage(1)
    settrending([])
    sethasMore(true)
  }

  useEffect(() => {
    refreshhandler()
  }, [Category, duration])

  useEffect(() => {
    if (trending.length === 0 && hasMore) {
      GetTrending()
    }
  }, [trending])

  return (
    <div
      id="trending-scroll"
      className="bg-[#0D0D0D] min-h-screen overflow-y-auto"
    >
      <PageHeader
        title="Trending"
        dropdowns={[
          {
            title: 'Category',
            options: ['movie', 'tv', 'all'],
            func: (e) => setCategory(e.target.value),
          },
          {
            title: 'Duration',
            options: ['week', 'day'],
            func: (e) => setduration(e.target.value),
          },
        ]}
      />

      {trending.length > 0 ? (
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={<p className="text-center text-zinc-400 py-6 text-sm">Loading more...</p>}
          scrollableTarget="trending-scroll"
        >
          <Cards data={trending} title={Category} />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Trending