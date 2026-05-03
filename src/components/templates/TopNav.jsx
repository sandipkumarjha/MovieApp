import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.webp";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  // 🔥 Debounce (important)
  useEffect(() => {
    if (query.trim().length < 2) {
      setSearches([]);
      return;
    }

    const delay = setTimeout(() => {
      getSearches();
    }, 400); // 400ms delay

    return () => clearTimeout(delay);
  }, [query]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi`, {
        params: { query }
      });
      console.log(data);
      setSearches(data.results || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center bg-[#0F0F0F]">

      {/* Search Icon */}
      <i className="text-2xl text-zinc-400 ri-search-2-line"></i>

      {/* Input */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="bg-transparent text-white mx-4 px-4 py-2 text-lg w-[40%] outline-none border-b border-zinc-600"
        type="text"
        placeholder="Search movies..."
      />

      {/* Clear Button */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 cursor-pointer ri-close-line"
        ></i>
      )}

      {/* Dropdown */}
      {searches.length > 0 && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[40%] max-h-[50vh] overflow-y-auto bg-zinc-900 rounded-md shadow-lg mt-2 z-50">

          {searches.map((s) => (
            <Link
            to={`/${s.media_type === "movie" ? "movie" : s.media_type === "tv" ? "tv" : "person"}/details/${s.id}`}
              key={s.id}
              className="flex items-center gap-3 p-3 border-b border-zinc-700 hover:bg-zinc-800 transition"
            >
              <img
                className="w-10 h-10 object-cover rounded"
                src={
                  s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w200${
                        s.poster_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />

              <span className="text-zinc-300">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default TopNav; 