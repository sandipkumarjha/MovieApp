import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav'
import TopNav from './templates/TopNav'
import axios from '../utils/axios'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'

const Home = () => {
    document.title = 'Home - Movie App'
    const [wallpaper,setwallpaper] = useState(null);
    
    const GetHeaderwallpaper = async () => {
      try {
        const { data } = await axios.get(`/trending/all/day`);
        
        
        let randomdata = data.results[(Math.random()*data.results.length).toFixed(0)];

        setwallpaper(randomdata || []);

      } catch (err) {
        console.log(err);
      }
    };
     useEffect(() => {
      !wallpaper && GetHeaderwallpaper();
    }, []);

  return  wallpaper?(
    <>
    <Sidenav/> 
    <div className='w-[80%] h-fulL  overflow -auto overflow-x-hidden   '>
        <TopNav/>
        <Header  data = {wallpaper}/>
        <HorizontalCards />
    </div>

    
    </>
  ):<h1>Loading</h1>
}

export default Home
