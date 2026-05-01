import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";







const Movie = () => {
    document.title = "Movie collection"; // ✅ set title
  const navigate = useNavigate();

  const [category, setCategory] = useState("now_playing"); // ✅ fixed
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
   

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}`,
        {
          params: { page },
        }
      );

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1); // ✅ safe update
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Reset when category changes
  useEffect(() => {
    setMovie([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // 🔥 Fetch when page or category changes
  useEffect(() => {
    GetMovie();
  }, [page, category]);

  return movie.length > 0 ?(
    <div className="px-[3%] w-screen h-screen overflow-y-auto">

      <div className="w-full flex items-center">

        <h1 className="w-[20%] text-3xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-fill"
          ></i>{" "}
          Movie <small className="ml-2 text-sm text-zinc-600">
            ({category})</small>
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["popular", "top_rated","upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />

        <div className="w-[2%]"></div>

        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />

      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        <Cards data={movie} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default Movie
