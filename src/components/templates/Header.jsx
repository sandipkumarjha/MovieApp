import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
      className="w-full h-[70vh] flex flex-col items-start justify-end p-[10%]"
    >
      <h1 className="w-[70%] text-5xl text-white font-semibold">
        {data?.name ||
          data?.title ||
          data?.original_name || 
          data?.original_title}
      </h1>

      <p className="text-white font-serif mt-3">
        {data?.overview ? data.overview.slice(0, 300) : "No description available"}......
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-600">more</Link>
      </p>

      <p className="text-white">
        <i className="text-yellow-700 ri-megaphone-fill"></i>{" "}
        {data?.release_date || "Releases Soon"}
        <i className="ml-5 text-yellow-700 ri-play-circle-fill">
          {" "}
          {data?.media_type?.toUpperCase()}
        </i>
      </p>

      <Link className="bg-[#6556CD] p-4 rounded-3xl text-white font-medium mt-3">
        watch trailer
      </Link>
    </div>
  );
};

export default Header;