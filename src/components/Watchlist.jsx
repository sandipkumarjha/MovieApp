import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies =
      JSON.parse(localStorage.getItem("watchlist")) || [];

    setMovies(savedMovies);
  }, []);

  const removeMovie = (id) => {
    const updated = movies.filter(
      (movie) => movie.id !== id
    );

    setMovies(updated);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-5 md:p-10">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
        My Watchlist
      </h1>

      {movies.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-zinc-400 text-xl">
            No Movies In Watchlist
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
            >
              <Link
                to={`/${movie.media_type}/details/${movie.id}`}
              >
                <img
                  className="w-full h-[260px] object-cover"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noimage
                  }
                  alt={movie.title || movie.name}
                />

                <div className="p-3">
                  <h2 className="text-white font-semibold line-clamp-2">
                    {movie.title || movie.name}
                  </h2>
                </div>
              </Link>

              <div className="p-3 pt-0">
                <button
                  onClick={() =>
                    removeMovie(movie.id)
                  }
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