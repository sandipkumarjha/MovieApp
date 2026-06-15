import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/MovieSlice'
import tvReducer from './reducers/tvSlice'
import personReducer from './reducers/PersonSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
})

export default store