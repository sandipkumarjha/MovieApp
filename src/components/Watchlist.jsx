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

        console.log("WATCHLIST DATA:", data);

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

  // Remove movie
  const removeMovie = async (movieId) => {
    try {
      const { error } = await supabase
        .from("watchlist")
        .delete()
        .eq("movie_id", movieId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Remove error:", error);
        alert("Failed to remove movie");
        return;
      }

      // Remove from UI immediately
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movie_id !== movieId)
      );
    } catch (error) {
      console.error("Remove movie error:", error);
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
    <div className="min-h-screen bg-[#0D0D0D] p-5 md:p-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold">
          My Watchlist
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-white"
        >
          ← Back
        </button>
      </div>

      {/* Empty Watchlist */}
      {movies.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-zinc-400 text-xl">
            No Movies In Watchlist
          </h2>

          <Link
            to="/"
            className="inline-block mt-5 bg-[#6556CD] hover:bg-[#574bc4] text-white px-5 py-2 rounded-lg"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        /* Movies */
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
            >

              {/* Movie Details */}
              <Link
                to={`/${movie.media_type}/details/${movie.movie_id}`}
              >
                <img
                  className="w-full h-[260px] object-cover"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noimage
                  }
                  alt={movie.title}
                />

                <div className="p-3">
                  <h2 className="text-white font-semibold line-clamp-2">
                    {movie.title}
                  </h2>
                </div>
              </Link>

              {/* Remove Button */}
              <div className="p-3 pt-0">
                <button
                  onClick={() => removeMovie(movie.movie_id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
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