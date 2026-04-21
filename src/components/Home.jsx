import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav'
import TopNav from './templates/TopNav'
import axios from '../utils/axios'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
const Home = () => {
    document.title = 'Home - Movie App'
    const [wallpaper,setwallpaper] = useState(null);
    const [trending,settrending] = useState(null);
    const [category,setcategory]   = useState("all");
    const GetHeaderwallpaper = async () => {
      try {
        const { data } = await axios.get(`/trending/all/day`);
        
        
        let randomdata = data.results[(Math.random()*data.results.length).toFixed(0)];

        setwallpaper(randomdata || []);

      } catch (err) {
        console.log(err);
      }
    };
    const GetTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/day`);
        

        settrending(data.results);

      } catch (err) { 
        console.log(err);
      }
    };
     useEffect(() => {
      !wallpaper && GetHeaderwallpaper();
      GetTrending();
    }, [category]);

  return  wallpaper && trending ?(
    <>
    <Sidenav/> 
    <div className='w-[80%] h-fulL  overflow-auto overflow-x-hidden   '>
        <TopNav/>
        <Header  data = {wallpaper}/>
        <div className=' flex justify-between mt-3 p-10'>
        <h1 className='text-white mb-5 text-3xl font-semibold '>
            Trending
        </h1>
        <Dropdown title = "Filter" options ={['tv','movie','all']} func ={(e)=> setcategory(e.target.value)}/>
        </div>
        <HorizontalCards  data = {trending} func  = {setcategory}/>
    </div>

    
    </>
  ):<h1>Loading</h1>
}

export default Home
