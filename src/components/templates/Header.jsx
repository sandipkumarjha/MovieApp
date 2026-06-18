import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({
  data,
  nextSlide,
  prevSlide,
  currentIndex,
  totalSlides,
}) => {

  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);

    const timeout = setTimeout(() => {
      setFade(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <div
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.3)),
      url(https://image.tmdb.org/t/p/original/${data?.backdrop_path || data?.profile_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
    }}
      className={`
        relative
        w-full
        h-[70vh]
        flex
        flex-col
        justify-end
        p-[10%]
        transition-opacity
        duration-700
        ${fade ? "opacity-100" : "opacity-0"}
      `}
    >

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          z-20 bg-black/40 hover:bg-black/70
          text-white w-12 h-12 rounded-full
          text-2xl
        "
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          z-20 bg-black/40 hover:bg-black/70
          text-white w-12 h-12 rounded-full
          text-2xl
        "
      >
        ❯
      </button>

      {/* Title */}
      <h1 className="
        w-full md:w-[80%] lg:w-[70%]
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        text-white font-bold
      ">
        {data?.name ||
          data?.title ||
          data?.original_name ||
          data?.original_title}
      </h1>

      {/* Description */}
      <p className="
        text-zinc-200 mt-3
        text-sm sm:text-base
        w-full md:w-[75%] lg:w-[60%]
      ">
        {data?.overview
          ? data.overview.slice(0, 250)
          : "No description available"}
        ...

        <Link
          to={`/${data?.media_type}/details/${data?.id}`}
          className="text-blue-400 ml-1"
        >
          more
        </Link>
      </p>

      {/* Meta */}
      <p className="text-zinc-300 mt-2 flex gap-3">
        <span>{data?.release_date || "Releases Soon"}</span>

        {data?.media_type && (
          <span className="bg-[#6556CD]/30 px-3 py-1 rounded-full text-xs">
            {data.media_type.toUpperCase()}
          </span>
        )}
      </p>

      {/* Trailer Button */}
      <Link
        to={`/${data?.media_type}/details/${data?.id}/trailer`}
        className="
          inline-flex items-center
          bg-[#6556CD]
          hover:bg-[#574bc4]
          text-white font-semibold
          px-6 py-3
          rounded-full
          mt-4
          w-fit
        "
      >
        Watch Trailer
      </Link>

      {/* Dots */}
      <div className="
        absolute
        bottom-6
        left-1/2
        -translate-x-1/2
        flex gap-2
        z-20
      ">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`
              w-3 h-3 rounded-full transition-all
              ${
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-gray-500"
              }
            `}
          />
        ))}
      </div>

    </div>
  );
};

export default Header;