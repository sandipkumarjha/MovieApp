import React from 'react'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
const HorizontalCards = ({data}) => {
  return (

        
        <div className='w-full flex  overflow-x-auto  gap-5 p-5'>
       {data.map((item,index) => (
      <Link
      to={`/${item.media_type}/details/${item.id}`}
       key={index} 
       className='min-w-[15%] bg-zinc-900 rounded-lg mt-5 mb-5'>
        <img className='w-full h-[20vh] object-cover rounded-lg' 
        src={`https://image.tmdb.org/t/p/original/${
          item?.backdrop_path || item?.poster_path
        })`} alt="" />
        <div className='p-3 h-[55%]'>
        <h1 className="w-[70%] text-xl text-white font-semibold">
        {item?.name ||
          item?.title ||
          item?.original_name || 
          item?.original_title}
      </h1>
      

      <p className="text-white font-serif mt-3">
        {item.overview.slice(0, 70)}......
        <span className="text-zinc-500">more</span>
      </p>
        </div>
        
       </Link>))}




        </div>
    
  )
}

export default HorizontalCards