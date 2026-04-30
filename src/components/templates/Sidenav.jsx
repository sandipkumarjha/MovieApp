import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
 
  
  return (
    <div className='w-[20%] h-full border-r-2  border-zinc-400 p-10   '>
      <h1 className='text-2xl text-white font-bold'>
      <i class=" text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className='text-2xl hover:bg-[#1f2937] rounded-xl'>NEXA</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3  '>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5' >New Feeds</h1>
       <Link to={'/trending'} className='hover:bg-[#6556CD] hover:text-[#EAEAEA] duration-300 rounded-lg p-5 font-serif  '> <i class="text-[orange] ri-fire-fill"></i> Tranding</Link>
       <Link to={'/popular'} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5  font-serif'><i class=" text-[#e6ca15] ri-bard-fill"></i> Popular</Link>
       <Link to={'/movie'} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 font-serif'><i class="text-[#00F5D4] ri-movie-2-ai-fill"></i> Movies</Link>
       <Link to ={'/tv'} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5  font-serif'> <i class=" text-[#c7bfbf] ri-slideshow-3-fill"></i> Tv Shows</Link>
       <Link to={'/person'} className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 font-serif'><i class="text-[#c7bfbf] ri-team-fill"></i> People</Link>
      
      </nav>
      <hr className='border-none h-1 bg-zinc-400 ' />
      

    </div>
  )
}

export default Sidenav
