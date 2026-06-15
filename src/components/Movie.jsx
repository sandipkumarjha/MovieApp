import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import PageHeader from './templates/PageHeader'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

// BUG FIXED: Original had a Duration dropdown calling setDuration
// but `duration` state was never declared — caused a ReferenceError crash.
// Removed the unused Duration dropdown (Movie API doesn't use it).

const Movie = () => {
  document.title = 'Movies - NEXA'

  const [category, setCategory] = useState('now_playing')
  const [movie, setMovie] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}`, {
        params: { page },
      })
      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setMovie([])
    setPage(1)
    setHasMore(true)
  }, [category])

  useEffect(() => {
    if (movie.length === 0 && hasMore) {
      GetMovie()
    }
  }, [movie, category])

  return (
    <div id="movie-scroll" className="bg-[#0D0D0D] min-h-screen overflow-y-auto">
      <PageHeader
        title="Movies"
        dropdowns={[
          {
            title: 'Category',
            options: ['popular', 'top_rated', 'upcoming', 'now_playing'],
            func: (e) => setCategory(e.target.value),
          },
        ]}
      />

      {movie.length > 0 ? (
        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie}
          hasMore={hasMore}
          loader={<p className="text-center text-zinc-400 py-6 text-sm">Loading more...</p>}
          scrollableTarget="movie-scroll"
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Movie