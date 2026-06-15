export { removeperson } from '../reducers/PersonSlice';
import axios from '../../src/utils/axios';
import { loadperson } from '../reducers/PersonSlice';

export const asyncloadperson = (id) => async (dispatch) => {
  try {
    const [
      detail,
      externalid,
      combinedCredits,
      tvCredits,
      movieCredits,
      
    ] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/tv_credits`),
      axios.get(`/person/${id}/movie_credits`),

    ]);

    

    const theultimatedetail = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
      
    };

    dispatch(loadperson(theultimatedetail));
    console.log(theultimatedetail);

  } catch (error) {
    console.log(error);
  }
};