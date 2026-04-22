import React from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import Cards from './templates/Cards';
import Loading from './Loading';

const Trending = () => {
    const navigate = useNavigate();
    const [Category, setCategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState(null);

    const GetTrending = async () => {
        try {
          const { data } = await axios.get(`/trending/${Category}/${duration}`);
          
  
          settrending(data.results);
  
        } catch (err) { 
          console.log(err);
        }
      };
         useEffect(() => {
          GetTrending();
        }, [Category , duration]);

  return trending ? (
    <div className='px-[3%] w-screen h-screen overflow-hidden overflow-y-auto'>

        <div className=' w-full  flex items-center '>
           
            <h1 className='w-[20%] text-3xl font-semibold text-zinc-400'>
                
            <i onClick={() =>navigate(-1)} 
            className="hover:text-[#6556CD] ri-arrow-left-fill"></i> Trending</h1>
            <Topnav />
            <Dropdown 
            title= 'Category' 
            options={["movie", "tv", "all"]} 
             func= {(e) => setCategory(e.target.value)}
            />
            <div className='w-[2%]'></div>
            <Dropdown title='Duration' options={["week" , "day"]} func="" />
        </div>
      <Cards data={trending} title ={Category}/>
    </div>
  ) :(
    <Loading />
  )
}

export default Trending
