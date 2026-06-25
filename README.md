# 🎬 Nexa — Movie Discovery Platform

Nexa is a modern movie discovery platform built using React and the TMDB API. It allows users to explore trending movies, TV shows, and popular personalities while providing detailed information, trailers, recommendations, and a personalized watchlist experience.

## Features

* Discover trending movies and TV shows
* Browse popular content across multiple categories
* Search movies, TV shows, and people in real time
* View detailed information including ratings, genres, release dates, and overviews
* Watch trailers directly within the application
* Personalized watchlist using Local Storage
* Similar and recommended content suggestions
* Fully responsive design for desktop, tablet, and mobile devices
* Fast and optimized user experience

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* Axios

### APIs

* TMDB (The Movie Database) API

### Deployment

* Vercel

## Project Structure

```bash
src/
├── components/
├── templates/
├── store/
├── utils/
├── App.jsx
└── main.jsx
```

## Key Highlights

* Dynamic routing for movie, TV show, and person detail pages
* Global state management using Redux
* API-driven architecture
* Responsive UI with modern design principles
* Watchlist persistence using browser storage
* Optimized search experience with debouncing
* Reusable and scalable component architecture

## Installation

```bash
git clone <repository-url>

cd nexa

npm install

npm run dev
```

## Environment Variables

Create a `.env` file and add your TMDB API credentials.

```env
VITE_TMDB_API_KEY=your_api_key
```

## Future Improvements

* User Authentication
* Cloud-Synced Watchlist
* Movie Reviews & Ratings
* Personalized Recommendations
* Dark/Light Theme
* PWA Support

## Live Demo

https://movie-e7u2qqjb3-kumarjhasandip30-3185s-projects.vercel.app/

<img width="1893" height="1071" alt="Screenshot 2026-06-15 234313" src="https://github.com/user-attachments/assets/905e9da4-e188-4e61-b814-62192379fd8a" />


## Author

Sandip Kumar Jha

Built as a practical frontend project focused on API integration, state management, responsive design, and modern React development practices.
