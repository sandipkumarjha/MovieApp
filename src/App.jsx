import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Loading from './components/Loading'
import Trending from './components/Trending'
const App = () => {
  return (
    <div className='bg-[#0D0D0D] w-screen h-screen flex    '>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<Trending/>}/>
        
      </Routes>


      
      
    </div>
  )
}

export default App
