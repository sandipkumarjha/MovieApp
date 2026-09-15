import React, { useEffect, useState } from 'react';
import Sidenav from './templates/Sidenav';
import TopNav from './templates/TopNav';
import axios from '../utils/axios';
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import Dropdown from './templates/DropDown';
import Loading from './Loading';
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { getMovieRecommendations } from "../utils/recommendations";

const Home = () => {
  document.title = 'Home - NEXA Movie App';

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
const [recommendationLoading, setRecommendationLoading] = useState(false);

const { user } = useAuth();

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];

      setWallpaper(randomData || null);
    } catch (err) {
      console.log(err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      setTrending(data.results);
      setCurrentIndex(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!wallpaper) {
      getHeaderWallpaper();
    }

    getTrending();
  }, [category]);
  useEffect(() => {
  const getRecommendations = async () => {
    if (!user) {
      setRecommendations([]);
      return;
    }

    try {
      setRecommendationLoading(true);

      // Get user's movie watchlist
      const { data: watchlist, error } = await supabase
        .from("watchlist")
        .select("movie_id, media_type")
        .eq("user_id", user.id)
        .eq("media_type", "movie");

      if (error) {
        console.error("Watchlist fetch error:", error);
        return;
      }

      if (!watchlist || watchlist.length === 0) {
        setRecommendations([]);
        return;
      }

      // Use maximum 3 movies as recommendation sources
      const sourceMovies = watchlist.slice(0, 3);

      const recommendationResults = await Promise.all(
        sourceMovies.map((movie) =>
          getMovieRecommendations(movie.movie_id)
        )
      );

      // Combine all recommendations
      const combined = recommendationResults.flat();

      // Remove duplicate movies
      const uniqueMovies = Array.from(
        new Map(
          combined.map((movie) => [movie.id, movie])
        ).values()
      );

      // Don't recommend movies already in watchlist
      const watchlistIds = new Set(
        watchlist.map((movie) => movie.movie_id)
      );

   const filteredRecommendations = uniqueMovies
  .filter((movie) => !watchlistIds.has(movie.id))
  .map((movie) => ({
    ...movie,
    media_type: "movie",
  }))
  .slice(0, 12);

      setRecommendations(filteredRecommendations);
    } catch (error) {
      console.error("Recommendation error:", error);
      setRecommendations([]);
    } finally {
      setRecommendationLoading(false);
    }
  };

  getRecommendations();
}, [user]);

  // Only use 5 movies for the hero carousel
  const headerSlides = trending?.slice(0, 5) || [];

  // Automatic hero slide change
  useEffect(() => {
    if (!headerSlides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === headerSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [headerSlides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === headerSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? headerSlides.length - 1 : prev - 1
    );
  };

  const currentMovie =
    headerSlides.length > 0
      ? headerSlides[currentIndex]
      : wallpaper;

  return wallpaper && trending ? (
    <div className="flex h-screen bg-[#0D0D0D]">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
        <div className="pt-16 lg:pt-0">
          <TopNav />

          {/* Hero / Header Carousel */}
          <Header
            data={currentMovie}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            currentIndex={currentIndex}
            totalSlides={headerSlides.length}
          />

          {/* Trending Section */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 sm:px-6 md:px-8">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
              Trending
            </h1>

            <Dropdown
              title="Filter"
              options={['tv', 'movie', 'all']}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* All trending movies remain available here */}
          <div className="mt-2 mb-6">
            <HorizontalCards data={trending} />
          </div>
 {user && recommendations.length > 0 && (
  <div className="mt-8">
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 mb-2">
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
        Recommended For You
      </h1>

      <span className="text-zinc-500 text-sm">
        Based on your watchlist
      </span>
    </div>

    <HorizontalCards data={recommendations} />
  </div>
)}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;