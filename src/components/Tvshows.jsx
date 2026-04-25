import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TVshow = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("popular");
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Title update
  useEffect(() => {
    document.title = `TV Shows  - MovieApp`;
  }, [category]);

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(
        `/tv/${category}`, // ✅ TV endpoint
        {
          params: { page },
        }
      );

      if (data.results.length > 0) {
        setTvShows((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Reset when category changes
  useEffect(() => {
    setTvShows([]);
    setPage(1);
    setHasMore(true);
    const fetchInitial = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}`, {
            params: { page: 1 },
          });
  
          setTvShows(data.results || []);
          setPage(2); // next page ready
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchInitial();
    }, [category]);

  return tvShows.length > 0 ? (
    <div className="px-[3%] w-screen h-screen overflow-y-auto">

      <div className="w-full flex items-center">

        <h1 className="w-[20%] text-3xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-fill"
          ></i>{" "}
          TV Shows ({category})
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["popular", "top_rated", "on_the_air", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />

      </div>

      <InfiniteScroll
        dataLength={tvShows.length}
        next={getTvShows}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        <Cards data={tvShows} title="tv" />
      </InfiniteScroll>

    </div>
  ) : (
    <Loading />
  );
};

export default TVshow;