import axios from 'axios';

const instance = axios.create({
   baseURL:"https://api.themoviedb.org/3/",

   headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjRhMmViNjkzMjk1NjliNWQxNWVkNzE4YmQ2N2UzYSIsIm5iZiI6MTc3NjYyNDcyMS4yODksInN1YiI6IjY5ZTUyNDUxYWRiNjI4OTZhMGM3MDU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuSwZIyrMErSXjDKgdbkKf5_Jd3H1K0C9Z7wjcjTPq4'
  }

});

export default instance; 