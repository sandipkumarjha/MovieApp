import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncloadmovies, removemovie } from '../store/actions/movieActions';
import Loading from './Loading';

const Moviedetails = () => { 
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(asyncloadmovies(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  // 🎬 Background image
  const bg =
    info?.detail?.backdrop_path ||
    info?.detail?.poster_path;

  // 🎥 Trailer
  const trailer = info?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return info ? (
    <div
      style={{
        background: bg
          ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(https://image.tmdb.org/t/p/original/${bg})`
          : "linear-gradient(#000, #222)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="w-screen min-h-screen px-[10%] text-white"
    >

      {/* 🔹 NAVBAR */}
      <nav className="h-[10vh] flex gap-10 items-center text-xl text-zinc-300">

        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-arrow-left-fill"></i>
        </button>

        {info?.detail?.homepage && (
          <a href={info.detail.homepage} target="_blank" rel="noreferrer">
            <i className="ri-external-link-fill"></i>
          </a>
        )}

        {info?.externalid?.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            target="_blank"
            rel="noreferrer"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* 🔹 MAIN SECTION */}
      <div className="flex gap-10">

        {/* 🎬 POSTER */}
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover rounded"
          src={`https://image.tmdb.org/t/p/original/${
            info?.detail?.poster_path || info?.detail?.backdrop_path
          }`}
          alt=""
        />

        {/* 📄 DETAILS */}
        <div className="w-[70%]">

          <h1 className="text-4xl font-bold">
            {info?.detail?.title || info?.detail?.name}
          </h1>

          {/* ⭐ Rating + Runtime */}
          <div className="flex items-center gap-5 mt-3 text-zinc-300">
            <span>⭐ {info?.detail?.vote_average?.toFixed(1)}</span>
            {info?.detail?.runtime && (
              <span>{info.detail.runtime} min</span>
            )}
            <span>{info?.detail?.release_date}</span>
          </div>

          {/* 🎭 Genres */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {info?.detail?.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-[#6556CD] px-3 py-1 rounded text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* 📝 Overview */}
          <p className="mt-5 text-zinc-300 leading-relaxed">
            {info?.detail?.overview}
          </p>

          {/* 🎬 WATCH TRAILER BUTTON */}
          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-5 px-6 py-2 bg-[#6556CD] rounded hover:bg-[#574bc4]"
            >
              ▶ Watch Trailer
            </button>
          )}

          {/* 🎥 WATCH PROVIDERS */}
          <div className="mt-6 flex gap-3 flex-wrap">
            {info?.watchproviders?.flatrate?.map((w) => (
              <img
                key={w.provider_id}
                className="w-[50px] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>

        </div>
      </div>

      {/* 🎬 TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">

          {/* Close */}
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-10 right-10 text-white text-3xl"
          >
            ✖
          </button>

          {/* Video */}
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;