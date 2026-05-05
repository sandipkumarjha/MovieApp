export { removemovie } from '../reducers/movieSlice';
import axios from '../../utils/axios';
import { loadmovie } from '../reducers/movieSlice';

export const asyncloadmovies = (id) => async (dispatch) => {
  try {
    const [
      detail,
      externalid,
      recommendations,
      similar,
      videos,
      watchproviders
    ] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`)
    ]);

    const trailer =
      videos.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ) || videos.data.results[0];

    const theultimatedetail = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: {
        results: videos.data.results,
        trailer: trailer,
      },
      watchproviders: watchproviders.data.results?.IN || null,
    };

    dispatch(loadmovie(theultimatedetail));
    console.log(theultimatedetail);

  } catch (error) {
    console.log(error);
  }
};