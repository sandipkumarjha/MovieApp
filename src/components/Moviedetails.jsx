import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";

import { asyncloadmovies, removemovie } from "../../store/actions/MovieAction";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

const Moviedetails = () => {
  const navigate = useNavigate();

  // Get movie ID from URL
  const { id } = useParams();

  // Redux
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  // Auth
  const { user } = useAuth();

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  // ==========================================
  // LOAD MOVIE DETAILS
  // ==========================================
  useEffect(() => {
    dispatch(asyncloadmovies(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  // ==========================================
  // CHECK WATCHLIST
  // ==========================================
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user || !info?.detail?.id) {
        setIsInWatchlist(false);
        return;
      }

      const { data, error } = await supabase
        .from("watchlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("movie_id", info.detail.id)
        .eq("media_type", "movie")
        .maybeSingle();

      if (error) {
        console.error("Watchlist check error:", error);
        return;
      }

      setIsInWatchlist(!!data);
    };

    checkWatchlist();
  }, [user, info]);

  // ==========================================
  // ADD TO WATCHLIST
  // ==========================================
  const addToWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInWatchlist) {
      return;
    }

    if (!info?.detail?.id) {
      console.error("Movie information is not available");
      return;
    }

    setWatchlistLoading(true);

    const movie = {
      user_id: user.id,
      movie_id: info.detail.id,
      title: info.detail.title || info.detail.name,
      poster_path: info.detail.poster_path,
      media_type: "movie",
    };

    const { error } = await supabase
      .from("watchlist")
      .insert(movie);

    if (error) {
      console.error("WATCHLIST INSERT ERROR:", error);
    } else {
      setIsInWatchlist(true);
    }

    setWatchlistLoading(false);
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (!info) {
    return <Loading />;
  }

  // ==========================================
  // BACKGROUND
  // ==========================================
  const bg =
    info?.detail?.backdrop_path ||
    info?.detail?.poster_path;

  return (
    <div
      style={{
        background: bg
          ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(https://image.tmdb.org/t/p/original/${bg})`
          : "linear-gradient(#000, #222)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className="relative min-h-screen px-4 sm:px-6 md:px-[10%] text-white"
    >
      {/* NAVBAR */}
      <nav className="h-[10vh] flex gap-10 items-center text-xl text-zinc-300">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-arrow-left-fill"></i>
        </button>

        {info?.detail?.homepage && (
          <a
            href={info.detail.homepage}
            target="_blank"
            rel="noreferrer"
          >
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

      {/* MAIN */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">

        {/* POSTER */}
        <img
          className="mx-auto md:mx-0 h-[40vh] sm:h-[50vh] md:h-[60vh] w-auto max-w-full shadow-lg object-cover rounded"
          src={
            info?.detail?.poster_path
              ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
              : "/noimage.webp"
          }
          alt={info?.detail?.title || "Movie poster"}
        />

        {/* DETAILS */}
        <div className="w-full md:w-[70%]">

          <h1 className="text-4xl font-bold">
            {info?.detail?.title || info?.detail?.name}
          </h1>

          {/* RATING */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 text-zinc-300">
            <span>
              ⭐{" "}
              {info?.detail?.vote_average
                ? info.detail.vote_average.toFixed(1)
                : "N/A"}
            </span>

            {info?.detail?.runtime && (
              <span>{info.detail.runtime} min</span>
            )}

            {info?.detail?.release_date && (
              <span>{info.detail.release_date}</span>
            )}
          </div>

          {/* GENRES */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {info?.detail?.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-[#6556CD] px-3 py-1 rounded text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* OVERVIEW */}
          <p className="mt-5 text-zinc-300 leading-relaxed mb-6">
            {info?.detail?.overview}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mt-5">

            <Link
              to="trailer"
              className="inline-flex items-center gap-2 bg-[#6556CD] px-5 py-2 rounded hover:bg-[#574bc4]"
            >
              <i className="ri-play-fill"></i>
              Watch Trailer
            </Link>

            <button
              onClick={addToWatchlist}
              disabled={watchlistLoading || isInWatchlist}
              className={`text-white px-6 py-2 rounded transition ${
                isInWatchlist
                  ? "bg-zinc-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {watchlistLoading
                ? "Adding..."
                : isInWatchlist
                ? "✓ In Watchlist"
                : "+ Add To Watchlist"}
            </button>
          </div>

          {/* WATCH PROVIDERS */}
          {info?.watchproviders?.flatrate?.length > 0 && (
            <div className="mt-10 flex gap-3 flex-wrap">
              {info.watchproviders.flatrate.map((provider) => (
                <img
                  key={provider.provider_id}
                  className="w-10 h-10 rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              ))}
            </div>
          )}

          {/* RECOMMENDATIONS */}
          <hr className="mt-10 mb-5" />

          <h2 className="text-2xl font-semibold mb-4">
            Recommendations & Similar
          </h2>

          <HorizontalCards
            data={
              info?.recommendations?.length > 0
                ? info.recommendations
                : info?.similar || []
            }
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Moviedetails;