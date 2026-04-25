import React from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import Cards from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';


const Trending = () => {
  document.title = "Trending Movies & TV Shows - MovieApp"; // ✅ set title
    const navigate = useNavigate();
    const [Category, setCategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , sethasMore] = useState(true);


    const GetTrending =async() => {
        try {
          const { data } = await axios.get(
            `/trending/${Category}/${duration}?page=${page}`
        
        );
        if(data.results.length > 0){
          settrending((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          sethasMore(false);
        }
        } catch (err) { 
          console.log(err);
        }
    };

      const refreshhandler = () => {
        if(trending.length == 0){
          GetTrending();
        }else{
          setpage(1);
          settrending([]);
          GetTrending();
      }
    };
         useEffect(() => {
          refreshhandler();
        }, [Category , duration]);

  return trending.length >0 ? (
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
            <Dropdown
            title='Duration'
            options={["week" , "day"]}
            func={(e)=>setduration(e.target.value)} />
        </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      
      
      >


      <Cards data={trending} title ={Category}/>
      </InfiniteScroll>
    </div>
  ) :(
    <Loading />
  );
}


export default Trending;
