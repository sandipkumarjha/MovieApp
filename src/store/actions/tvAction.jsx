export { removetv } from '../reducers/tvSlice';
import axios from '../../utils/axios';
import { loadtv } from '../reducers/tvSlice';

export const asyncloadtv = (id) => async (dispatch) => {
  try {
    const [
      detail,
      externalid,
      recommendations,
      similar,
      videos,
      watchproviders
    ] = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`)
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

    dispatch(loadtv(theultimatedetail));
    console.log(theultimatedetail);

  } catch (error) {
    console.log(error);
  }
};
