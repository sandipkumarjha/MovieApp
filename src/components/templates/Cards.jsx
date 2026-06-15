import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data = [], title = 'movie' }) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-3 sm:gap-4 md:gap-5
        p-3 sm:p-4
      "
    >
      {data.map((item, index) => (
        <Link
          key={index}
          to={`/${item.media_type || title}/details/${item.id}`}
          className="
            group bg-zinc-900 rounded-xl overflow-hidden
            hover:scale-105 hover:shadow-xl hover:shadow-black/60
            transition-all duration-200 flex flex-col
          "
        >
          {/* Poster — correct 2:3 movie poster ratio */}
          <div className="w-full aspect-[2/3] overflow-hidden bg-zinc-800">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              src={
                item.poster_path || item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      item.poster_path || item.backdrop_path || item.profile_path
                    }`
                  : 'https://placehold.co/300x450/1F1E24/6556CD?text=No+Image'
              }
              alt={
                item.title || item.name || item.original_name || item.original_title || 'Poster'
              }
              loading="lazy"
            />
          </div>

          {/* Title */}
          <div className="p-2 sm:p-3 flex-1">
            <h2 className="text-white font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
              {item.title || item.name || item.original_name || item.original_title || 'Untitled'}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;