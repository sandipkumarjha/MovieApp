import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import PageHeader from './templates/PageHeader'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const TVshow = () => {
  const [category, setCategory] = useState('popular')
  const [tvShows, setTvShows] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    document.title = 'TV Shows - NEXA'
  }, [category])

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}`, {
        params: { page },
      })
      if (data.results.length > 0) {
        setTvShows((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTvShows([])
    setPage(2)
    setHasMore(true)

    const fetchInitial = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}`, {
          params: { page: 1 },
        })
        setTvShows(data.results || [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchInitial()
  }, [category])

  return (
    <div id="tv-scroll" className="bg-[#0D0D0D] min-h-screen overflow-y-auto">
      <PageHeader
        title="TV Shows"
        dropdowns={[
          {
            title: 'Category',
            options: ['popular', 'top_rated', 'on_the_air', 'airing_today'],
            func: (e) => setCategory(e.target.value),
          },
        ]}
      />

      {tvShows.length > 0 ? (
        <InfiniteScroll
          dataLength={tvShows.length}
          next={getTvShows}
          hasMore={hasMore}
          loader={<p className="text-center text-zinc-400 py-6 text-sm">Loading more...</p>}
          scrollableTarget="tv-scroll"
        >
          <Cards data={tvShows} title="tv" />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default TVshow