import React from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';

const Trending = () => {
    const navigate = useNavigate();
  return (
    <div className='p-[3%] w-screen h-screen'>

        <div className=' w-full  flex items-center '>
           
            <h1 className='text-3xl font-semibold text-zinc-400'>
                
            <i onClick={() =>navigate(-1)} 
            class="hover:text-[#6556CD] ri-arrow-left-fill"></i> Trending</h1>
            <Topnav />
            <Dropdown 
            title= 'Category' 
            options={["movie", "tv", "all"]} 
             func=""
            />
        </div>
      
    </div>
  )
}

export default Trending
