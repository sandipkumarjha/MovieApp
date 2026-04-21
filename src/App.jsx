import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
const App = () => {
  return (
    <div className='bg-[#0D0D0D] w-screen h-screen flex    '>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
      </Routes>


      
      
    </div>
  )
}

export default App
