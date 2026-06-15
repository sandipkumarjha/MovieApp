import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCards = ({ data = [] }) => {
  return (
    <div className="
      w-full flex gap-4 sm:gap-5
      overflow-x-auto pb-4
      px-2 sm:px-4
      scroll-smooth snap-x snap-mandatory
    ">
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || 'movie'}/details/${item.id}`}
          key={index}
          className="
            flex-none
            min-w-[160px] sm:min-w-[190px] md:min-w-[210px]
            bg-zinc-900 rounded-xl overflow-hidden
            hover:scale-105 hover:shadow-xl hover:shadow-black/50
            transition-transform duration-200 snap-start
          "
        >
          {/* Image — fixed broken URL (removed stray closing paren from original) */}
          <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-800">
            <img
              className="w-full h-full object-cover"
              src={
                item?.backdrop_path || item?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item?.backdrop_path || item?.poster_path}`
                  : 'https://placehold.co/300x170/1F1E24/6556CD?text=No+Image'
              }
              alt={item?.title || item?.name || ''}
              loading="lazy"
            />
          </div>

          <div className="p-3">
            <h1 className="text-white font-semibold text-sm leading-tight line-clamp-1">
              {item?.name || item?.title || item?.original_name || item?.original_title}
            </h1>
            <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item?.overview
                ? item.overview.slice(0, 60) + '...'
                : 'No description available.'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HorizontalCards