import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'

const App = () => {
  return (
    <div className='bg-[#0D0D0D] w-screen h-screen flex    '>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/trending' element={<Trending />}/>
        <Route path='/popular' element={<Popular />}/>
        <Route path='/movie' element={<Movie />}/>
        <Route path='/tv' element={<Tvshows />}/>
      </Routes>


      
      
    </div>
  )
}

export default App
