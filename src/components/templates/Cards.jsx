import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data ,title}) => {
  return (
    <div className='flex flex-wrap w-full  h-full p-[5%] '>
      <div className='flex flex-wrap'>
        {data.map((c,i)=>(
            <Link className='relative w-[25vh] mr-[5%] mb-[5%] hover:bg-[#6556CD] rounded-2xl' key={i}>
                <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${
          c.poster_path || c.backdrop_path || c.profile_path
        }`} alt="" />

        <h1 className=' text-2xl text-zinc-400 mt-3 font-semibold'>
                {
                    c.name ||
                    c.title ||
                    c.original_title ||
                    c.original_name
                }
        </h1>
        {c.vote_average && <div  className='text-white absolute right-[-10%] bottom-[25%]  trxt-xl font-semibold bg-yellow-500 rounded-full w-[7vh] h-[7vh] flex justify-center items-center'>
                  {(c.vote_average*10).toFixed()} <sup>%</sup>
                </div>}
                
            </Link>
        ))}
        </div>
    </div>
  )
}

export default Cards