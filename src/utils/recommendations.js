import axios from "./axios";

// Get recommended movies for a specific movie
export const getMovieRecommendations = async (movieId) => {
  try {
    const { data } = await axios.get(
      `/movie/${movieId}/recommendations`
    );

    return data.results || [];
  } catch (error) {
    console.error(
      "Recommendation fetch error:",
      error
    );

    return [];
  }
};