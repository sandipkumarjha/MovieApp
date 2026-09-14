import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data = [] }) => {
  return (
    <div
      className="
        w-full
        flex gap-4
        overflow-x-auto
        pb-4
        px-4 sm:px-6
        scroll-smooth
        snap-x snap-mandatory
        scrollbar-hide
      "
    >
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || 'movie'}/details/${item.id}`}
          key={item.id || index}
          className="
            flex-none
            w-[220px]
            sm:w-[240px]
            md:w-[260px]
            lg:w-[280px]

            bg-zinc-900
            rounded-xl
            overflow-hidden

            snap-start

            hover:scale-[1.02]
            hover:shadow-xl
            hover:shadow-black/40

            transition-transform
            duration-200
          "
        >
          {/* Movie Image */}
          <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-800">
            <img
              className="w-full h-full object-cover"
              src={
                item?.backdrop_path || item?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      item?.backdrop_path || item?.poster_path
                    }`
                  : 'https://placehold.co/300x170/1F1E24/6556CD?text=No+Image'
              }
              alt={item?.title || item?.name || 'Movie'}
              loading="lazy"
            />
          </div>

          {/* Movie Information */}
          <div className="p-3">
            <h2 className="text-white font-semibold text-sm leading-tight line-clamp-1">
              {item?.name ||
                item?.title ||
                item?.original_name ||
                item?.original_title}
            </h2>

            <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item?.overview
                ? `${item.overview.slice(0, 70)}...`
                : 'No description available.'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;