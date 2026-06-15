import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav'
import TopNav from './templates/TopNav'
import axios from '../utils/axios'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/DropDown'
import Loading from './Loading'

const Home = () => {
  document.title = 'Home - NEXA Movie App'
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setcategory] = useState('all')

  const GetHeaderwallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`)
      const randomdata =
        data.results[Math.floor(Math.random() * data.results.length)]
      setwallpaper(randomdata || null)
    } catch (err) {
      console.log(err)
    }
  }

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`)
      settrending(data.results)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!wallpaper) GetHeaderwallpaper()
    GetTrending()
  }, [category])

  useEffect(() => {
    if (!trending?.length) return;
  
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === trending.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  
    return () => clearInterval(interval);
  }, [trending]);
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === trending.length - 1 ? 0 : prev + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? trending.length - 1 : prev - 1
    );
  };
  const currentMovie =
  trending && trending.length > 0
    ? trending[currentIndex]
    : wallpaper;

  return wallpaper && trending ? (
    <div className="flex h-screen bg-[#0D0D0D]">

      {/* Sidebar — off-canvas on mobile/tablet, static on desktop */}
      <Sidenav />

      {/* Main content — flex-1 fills space beside sidebar on desktop,
          full width on mobile since sidebar is position:fixed */}
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">

        {/* pt-16 on mobile clears the hamburger button, removed on lg+ */}
        <div className="pt-16 lg:pt-0">
          <TopNav />
          <Header
         data={currentMovie}
         nextSlide={nextSlide}
         prevSlide={prevSlide}
         currentIndex={currentIndex}
         totalSlides={trending?.length}
/>

          {/* Trending section header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 sm:px-6 md:px-8">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
              Trending
            </h1>
            <Dropdown
              title="Filter"
              options={['tv', 'movie', 'all']}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="mt-2 mb-6">
            <HorizontalCards data={trending} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Home