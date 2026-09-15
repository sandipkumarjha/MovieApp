import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";


const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching favorites:", error);
        setFavorites([]);
      } else {
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, [user, authLoading, navigate]);

  // Remove favorite
  const removeFavorite = async (movieId, mediaType) => {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId)
      .eq("media_type", mediaType);

    if (error) {
      console.error("Error removing favorite:", error);
      return;
    }

    // Update UI immediately
    setFavorites((prev) =>
      prev.filter(
        (item) =>
          !(
            item.movie_id === movieId &&
            item.media_type === mediaType
          )
      )
    );
  };

  // Auth loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <p className="text-white text-lg">Loading favorites...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white px-4 sm:px-6 md:px-[5%] py-8 sm:py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <i className="ri-heart-fill text-pink-500"></i>
            My Favorites
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            {favorites.length}{" "}
            {favorites.length === 1 ? "title" : "titles"} in your favorites
          </p>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
          <i className="ri-heart-line text-6xl text-zinc-600 mb-5"></i>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            No Favorites Yet
          </h2>

          <p className="text-zinc-400 max-w-md mb-6">
            You haven't added any movies or TV shows to your favorites yet.
          </p>

          <Link
            to="/"
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-zinc-900 rounded-lg overflow-hidden group"
            >
              {/* Poster */}
              <Link
                to={`/${favorite.media_type}/details/${favorite.movie_id}`}
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  {favorite.poster_path ? (
  <img
    src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`}
    alt={favorite.title}
    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
    <i className="ri-image-line text-5xl text-zinc-600"></i>
  </div>
)}

                  {/* Media Type */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs uppercase">
                    {favorite.media_type === "tv" ? "TV" : "Movie"}
                  </div>

                  {/* Heart */}
                  <div className="absolute top-2 right-2 bg-black/70 rounded-full w-8 h-8 flex items-center justify-center">
                    <i className="ri-heart-fill text-pink-500"></i>
                  </div>
                </div>
              </Link>

              {/* Details */}
              <div className="p-3">
                <Link
                  to={`/${favorite.media_type}/details/${favorite.movie_id}`}
                >
                  <h2 className="font-semibold text-sm line-clamp-2 hover:text-pink-400 transition">
                    {favorite.title}
                  </h2>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeFavorite(
                      favorite.movie_id,
                      favorite.media_type
                    )
                  }
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white text-sm py-2 rounded transition"
                >
                  <i className="ri-heart-line"></i>
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

export default Favorites;