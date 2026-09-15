import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/TVshow'
import People from './components/People'
import Moviedetails from './components/Moviedetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './components/templates/Trailer'
import Watchlist from "./components/Watchlist";
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";


const App = () => {
  return (
    <div className='bg-[#0D0D0D] min-h-screen'>
      <Routes>
         {/* Authentication */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element = {<Login/>}/>
        
         {/* Main Page */}
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />

        <Route path='/movie/details/:id' element={<Moviedetails />}>
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route
  path="/watchlist"
  element={
    <ProtectedRoute>
      <Watchlist />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

        <Route path='/tv' element={<Tvshows />} />
        <Route path='/tv/details/:id' element={<Tvdetails />}>
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>

        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />
        
      </Routes>
    </div>
  )
}

export default App