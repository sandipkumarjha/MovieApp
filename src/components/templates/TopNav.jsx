import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.webp";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const wrapperRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setSearches([]);
      return;
    }
    const delay = setTimeout(() => {
      getSearches();
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSearches([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi`, { params: { query } });
      setSearches(data.results || []);
    } catch (err) {
      console.log(err);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearches([]);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center bg-[#0F0F0F] w-full px-3 sm:px-5 py-3"
    >
      {/* Search icon */}
      <i className="text-xl text-zinc-400 ri-search-2-line flex-shrink-0"></i>

      {/* Input */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="
          bg-transparent text-white
          mx-2 sm:mx-4
          px-2 py-1.5
          text-sm sm:text-base
          w-full min-w-0
          outline-none
          border-b border-zinc-600
          focus:border-[#6556CD]
          transition-colors duration-200
        "
        type="text"
        placeholder="Search movies, shows, people..."
      />

      {/* Clear button */}
      {query.length > 0 && (
        <button
          onClick={clearSearch}
          className="flex-shrink-0 text-zinc-400 hover:text-white p-1"
          aria-label="Clear search"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      )}

      {/* Dropdown results */}
      {searches.length > 0 && (
        <div
          className="
            absolute top-full left-0 right-0
            sm:left-1/2 sm:-translate-x-1/2
            sm:w-[500px] sm:max-w-[90vw]
            w-full
            max-h-[60vh] sm:max-h-[50vh]
            overflow-y-auto
            bg-zinc-900
            border border-zinc-700
            rounded-lg shadow-2xl
            mt-1 z-50
          "
        >
          {searches.map((s) => (
            <Link
              to={`/${
                s.media_type === "movie"
                  ? "movie"
                  : s.media_type === "tv"
                  ? "tv"
                  : "person"
              }/details/${s.id}`}
              key={s.id}
              onClick={clearSearch}
              className="flex items-center gap-3 p-3 border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                src={
                  s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w200${s.poster_path || s.profile_path}`
                    : noimage
                }
                alt=""
              />
              <div className="min-w-0">
                <span className="text-zinc-200 text-sm sm:text-base block truncate">
                  {s.name || s.title || s.original_name || s.original_title}
                </span>
                <span className="text-zinc-500 text-xs capitalize">{s.media_type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;