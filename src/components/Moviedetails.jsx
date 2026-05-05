import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { asyncloadmovies, removemovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovies(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  // 🎬 Background
  const bg =
    info?.detail?.backdrop_path ||
    info?.detail?.poster_path;

  return info ? (
    <div
      style={{
        background: bg
          ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(https://image.tmdb.org/t/p/original/${bg})`
          : "linear-gradient(#000, #222)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="relative min-h-screen px-[10%] text-white"
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

      {/* 🔹 MAIN */}
      <div className="flex gap-10">

        {/* 🎬 POSTER */}
        <img
          className="shadow-lg h-[60vh] object-cover rounded"
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

          {/* ⭐ Rating */}
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
          <p className="mt-5 text-zinc-300 leading-relaxed mb-6">
            {info?.detail?.overview}
          </p>

          {/* 🎬 TRAILER BUTTON (ROUTER BASED) */}
          <Link
            to="trailer"
            className="inline-flex items-center gap-2 bg-[#6556CD] px-5 py-2 rounded hover:bg-[#574bc4]"
          >
            <i className="ri-play-fill"></i>
            Watch Trailer
          </Link>

          {/* 🎥 WATCH PROVIDERS */}
          <div className="mt-10 flex gap-3 flex-wrap">
            {info?.watchproviders?.flatrate?.map((w) => (
              <img
                key={w.provider_id}
                className="w-[50px] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>

          {/* 🎯 RECOMMENDATIONS */}
          <hr className="mt-10 mb-5" />
          <h2 className="text-2xl font-semibold mb-4">
            Recommendations & Similar
          </h2>

          <HorizontalCards
            data={
              info?.recommendations?.length > 0
                ? info.recommendations
                : info?.similar
            }
          />
        </div>
      </div>

      {/* 🔥 TRAILER OUTLET */}
      <Outlet />

    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;