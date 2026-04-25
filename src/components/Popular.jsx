import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {

    document.title = "Popular Movies & TV Shows - MovieApp"; // ✅ set title
  const navigate = useNavigate();

  const [category, setCategory] = useState("movie"); // ✅ fixed
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [duration, setDuration] = useState("day"); // ✅ added

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `/${category}/popular`,
        {
          params: { page },
        }
      );

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
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
    setPopular([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // 🔥 Fetch when page or category changes
  useEffect(() => {
    getPopular();
  }, [page, category]);

  return popular.length > 0 ? (
    <div className="px-[3%] w-screen h-screen overflow-y-auto">

      <div className="w-full flex items-center">

        <h1 className="w-[20%] text-3xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-fill"
          ></i>{" "}
          Popular {/* ✅ fixed typo */}
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["movie", "tv"]}
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
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;