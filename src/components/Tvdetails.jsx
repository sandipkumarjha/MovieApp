import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";

import {
  asyncloadtv,
  removetv,
} from "../../store/actions/TvAction";

import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

const Tvdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  // ==========================================
  // LOAD TV DETAILS
  // ==========================================
  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  // ==========================================
  // CHECK IF TV SHOW IS IN WATCHLIST
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
        .eq("media_type", "tv")
        .maybeSingle();

      if (error) {
        console.error("TV Watchlist check error:", error);
        return;
      }

      setIsInWatchlist(!!data);
    };

    checkWatchlist();
  }, [user, info]);

  // ==========================================
  // ADD TV SHOW TO WATCHLIST
  // ==========================================
  const addToWatchlist = async () => {
    // User is not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Already in watchlist
    if (isInWatchlist) {
      return;
    }

    // TV data not available
    if (!info?.detail?.id) {
      console.error("TV information is not available");
      return;
    }

    setWatchlistLoading(true);

    const tvShow = {
      user_id: user.id,
      movie_id: info.detail.id,
      title: info.detail.name || info.detail.title,
      poster_path: info.detail.poster_path,
      media_type: "tv",
    };

    console.log("TV WATCHLIST:", tvShow);

    const { error } = await supabase
      .from("watchlist")
      .insert(tvShow);

    if (error) {
      console.error("TV WATCHLIST INSERT ERROR:", error);
    } else {
      setIsInWatchlist(true);
    }

    setWatchlistLoading(false);
  };

  // ==========================================
  // BACKGROUND
  // ==========================================
  const bg =
    info?.detail?.backdrop_path ||
    info?.detail?.poster_path;

  // ==========================================
  // LOADING
  // ==========================================
  if (!info) {
    return <Loading />;
  }

  return (
    <div
      style={{
        background: bg
          ? `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${bg})`
          : "linear-gradient(#000, #222)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
      className="relative min-h-screen text-white"
    >
      {/* ==========================================
          NAVBAR
      ========================================== */}
      <nav
        className="
          flex gap-4 sm:gap-6 items-center
          text-lg sm:text-xl text-zinc-300
          px-4 sm:px-8 md:px-[6%] lg:px-[10%]
          py-4 sm:py-5
          sticky top-0 z-10
          bg-black/40 backdrop-blur-sm
        "
      >
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] transition-colors p-1"
          aria-label="Go back"
        >
          <i className="ri-arrow-left-fill text-2xl"></i>
        </button>

        {/* Official website */}
        {info?.detail?.homepage && (
          <a
            href={info.detail.homepage}
            target="_blank"
            rel="noreferrer"
            className="
              hover:text-[#6556CD]
              transition-colors
              flex items-center gap-1
            "
          >
            <i className="ri-external-link-fill"></i>
            <span className="hidden sm:inline text-sm">
              Website
            </span>
          </a>
        )}

        {/* IMDb */}
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

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <div
        className="
          flex flex-col md:flex-row
          gap-6 md:gap-8 lg:gap-10
          px-4 sm:px-8 md:px-[6%] lg:px-[10%]
          py-6 md:py-8
        "
      >
        {/* POSTER */}
        <div className="flex justify-center md:justify-start flex-shrink-0">
          <img
            className="
              w-full
              max-w-[200px]
              sm:max-w-[240px]
              md:max-w-[260px]
              lg:max-w-[300px]
              aspect-[2/3]
              object-cover
              rounded-xl
              shadow-2xl
            "
            src={
              info?.detail?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`
                : "/noimage.webp"
            }
            alt={
              info?.detail?.name ||
              info?.detail?.title ||
              "TV Show poster"
            }
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-0">

          {/* TITLE */}
          <h1
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              font-bold
              leading-tight
            "
          >
            {info?.detail?.name ||
              info?.detail?.title ||
              "Unknown TV Show"}
          </h1>

          {/* RATING / DATE */}
          <div
            className="
              flex flex-wrap
              items-center
              gap-3 sm:gap-5
              mt-3
              text-zinc-300
              text-sm sm:text-base
            "
          >
            <span className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-400"></i>

              {info?.detail?.vote_average
                ? info.detail.vote_average.toFixed(1)
                : "N/A"}
            </span>

            {info?.detail?.runtime && (
              <span>
                {info.detail.runtime} min
              </span>
            )}

            {info?.detail?.first_air_date && (
              <span>
                {info.detail.first_air_date}
              </span>
            )}
          </div>

          {/* GENRES */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {info?.detail?.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  bg-[#6556CD]
                  px-3 py-1
                  rounded-full
                  text-xs sm:text-sm
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* OVERVIEW */}
          <p
            className="
              mt-5
              text-zinc-300
              leading-relaxed
              text-sm sm:text-base
            "
          >
            {info?.detail?.overview ||
              "No description available."}
          </p>

          {/* ==========================================
              ACTION BUTTONS
          ========================================== */}
          <div className="flex flex-wrap items-center gap-3 mt-5">

            {/* TRAILER */}
            <Link
              to="trailer"
              className="
                inline-flex
                items-center
                gap-2
                bg-[#6556CD]
                hover:bg-[#574bc4]
                px-5 sm:px-6
                py-2.5 sm:py-3
                rounded-full
                font-semibold
                text-sm sm:text-base
                transition-colors
                duration-200
                shadow-lg
                active:scale-95
              "
            >
              <i className="ri-play-fill text-lg"></i>
              Watch Trailer
            </Link>

            {/* WATCHLIST */}
            <button
              onClick={addToWatchlist}
              disabled={
                watchlistLoading ||
                isInWatchlist
              }
              className={`
                px-5 sm:px-6
                py-2.5 sm:py-3
                rounded-full
                text-white
                font-semibold
                text-sm sm:text-base
                transition
                ${
                  isInWatchlist
                    ? "bg-zinc-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }
              `}
            >
              {watchlistLoading
                ? "Adding..."
                : isInWatchlist
                ? "✓ In Watchlist"
                : "+ Add To Watchlist"}
            </button>
          </div>

          {/* ==========================================
              WATCH PROVIDERS
          ========================================== */}
          {info?.watchproviders?.flatrate?.length > 0 && (
            <div className="mt-6">
              <p
                className="
                  text-zinc-500
                  text-xs
                  uppercase
                  tracking-wider
                  mb-2
                "
              >
                Available on
              </p>

              <div className="flex gap-3 flex-wrap">
                {info.watchproviders.flatrate.map(
                  (provider) => (
                    <img
                      key={provider.provider_id}
                      className="
                        w-10 h-10
                        sm:w-12 sm:h-12
                        rounded-lg
                        shadow-md
                      "
                      src={`https://image.tmdb.org/t/p/w200/${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          RECOMMENDATIONS
      ========================================== */}
      <div
        className="
          px-4 sm:px-8
          md:px-[6%]
          lg:px-[10%]
          pb-10
        "
      >
        <hr className="border-zinc-700 mb-6" />

        <h2
          className="
            text-xl sm:text-2xl
            font-semibold
            mb-4
            text-zinc-200
          "
        >
          Recommendations &amp; Similar
        </h2>

        <HorizontalCards
          data={
            info?.recommendations?.length > 0
              ? info.recommendations
              : info?.similar || []
          }
        />
      </div>

      <Outlet />
    </div>
  );
};

export default Tvdetails;