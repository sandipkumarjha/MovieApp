import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Title
  useEffect(() => {
    document.title = "Popular People - MovieApp";
  }, []);

  const getPeople = async () => {
    try {
      const { data } = await axios.get("/person/popular", {
        params: { page },
      });

      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Initial fetch
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const { data } = await axios.get("/person/popular", {
          params: { page: 1 },
        });

        setPeople(data.results || []);
        setPage(2);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitial();
  }, []);

  return people.length > 0 ? (
    <div className="px-[3%] w-screen h-screen overflow-y-auto">

      <div className="w-full flex items-center">

        <h1 className="w-[20%] text-3xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-fill"
          ></i>{" "}
         People
        </h1>

        <Topnav />

      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>

    </div>
  ) : (
    <Loading />
  );
};

export default People;