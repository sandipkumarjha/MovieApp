import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import noimage from "/noimage.webp";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Load user's watchlist
  useEffect(() => {
    const getWatchlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("watchlist")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Watchlist fetch error:", error);
          return;
        }

        setMovies(data || []);
      } catch (error) {
        console.error("Watchlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        navigate("/login");
      } else {
        getWatchlist();
      }
    }
  }, [user, authLoading, navigate]);

  // Remove movie or TV show
  const removeMovie = async (movieId, mediaType) => {
    try {
      const { error } = await supabase
        .from("watchlist")
        .delete()
        .eq("movie_id", movieId)
        .eq("media_type", mediaType)
        .eq("user_id", user.id);

      if (error) {
        console.error("Remove error:", error);
        alert("Failed to remove from watchlist");
        return;
      }

      // Remove from UI immediately
      setMovies((prevMovies) =>
        prevMovies.filter(
          (movie) =>
            !(
              movie.movie_id === movieId &&
              movie.media_type === mediaType
            )
        )
      );
    } catch (error) {
      console.error("Remove error:", error);
      alert("Something went wrong");
    }
  };

  // Authentication loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <p className="text-white text-lg">
          Loading Watchlist...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] px-4 py-6 sm:px-6 md:px-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            My Watchlist
          </h1>

          <p className="text-green-300 text-sm mt-1">
            {movies.length}{" "}
            {movies.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="
            text-zinc-400
            hover:text-white
            transition
            text-sm
            sm:text-base
          "
        >
          ← Back
        </button>

      </div>

      {/* Empty Watchlist */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 px-5">

          <div
            className="
              w-20 h-20
              rounded-full
              bg-zinc-900
              border border-zinc-800
              flex items-center justify-center
              mb-5
            "
          >
            <i className="ri-heart-line text-4xl text-zinc-600"></i>
          </div>

          <h2 className="text-white text-xl sm:text-2xl font-semibold">
            Your watchlist is empty
          </h2>

          <p className="text-zinc-500 mt-2 max-w-md">
            Save movies and TV shows you want to watch later.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              bg-[#6556CD]
              hover:bg-[#574bc4]
              text-white
              px-5 py-2.5
              rounded-lg
              transition
            "
          >
            <i className="ri-movie-2-line"></i>
            Browse Movies
          </Link>

        </div>
      ) : (

        /* Watchlist Grid */
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            gap-4
            sm:gap-5
          "
        >

          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                group
                bg-zinc-900
                rounded-xl
                overflow-hidden
                border border-zinc-800
                hover:border-zinc-600
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Poster */}
              <Link
                to={`/${movie.media_type}/details/${movie.movie_id}`}
                className="block relative"
              >
                <img
                  className="
                    w-full
                    h-[230px]
                    sm:h-[280px]
                    md:h-[300px]
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-300
                  "
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noimage
                  }
                  alt={movie.title}
                />

                {/* Media Type Badge */}
                <span
                  className="
                    absolute
                    top-2
                    left-2
                    px-2
                    py-1
                    rounded
                    bg-black/70
                    backdrop-blur-sm
                    text-white
                    text-[10px]
                    uppercase
                    font-semibold
                  "
                >
                  {movie.media_type}
                </span>
              </Link>

              {/* Information */}
              <div className="p-3">

                <Link
                  to={`/${movie.media_type}/details/${movie.movie_id}`}
                >
                  <h2
                    className="
                      text-white
                      font-semibold
                      text-sm
                      sm:text-base
                      line-clamp-2
                      hover:text-[#8b82e8]
                      transition
                    "
                  >
                    {movie.title}
                  </h2>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeMovie(movie.movie_id, movie.media_type)
                  }
                  className="
                    w-full
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-zinc-800
                    hover:bg-red-600
                    text-zinc-300
                    hover:text-white
                    py-2
                    rounded-lg
                    text-sm
                    transition
                  "
                >
                  <i className="ri-delete-bin-line"></i>
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Watchlist;