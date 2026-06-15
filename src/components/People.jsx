import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import PageHeader from './templates/PageHeader'
import Cards from './templates/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const People = () => {
  const [people, setPeople] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    document.title = 'Popular People - NEXA'
  }, [])

  const getPeople = async () => {
    try {
      const { data } = await axios.get('/person/popular', {
        params: { page },
      })
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const { data } = await axios.get('/person/popular', {
          params: { page: 1 },
        })
        setPeople(data.results || [])
        setPage(2)
      } catch (err) {
        console.log(err)
      }
    }
    fetchInitial()
  }, [])

  return (
    <div id="people-scroll" className="bg-[#0D0D0D] min-h-screen overflow-y-auto">
      <PageHeader title="People" />

      {people.length > 0 ? (
        <InfiniteScroll
          dataLength={people.length}
          next={getPeople}
          hasMore={hasMore}
          loader={<p className="text-center text-zinc-400 py-6 text-sm">Loading more...</p>}
          scrollableTarget="people-scroll"
        >
          <Cards data={people} title="person" />
        </InfiniteScroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default People