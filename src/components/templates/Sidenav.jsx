import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    { to: '/trending', label: 'Trending', icon: 'ri-fire-fill', color: 'text-orange-400' },
    { to: '/popular', label: 'Popular', icon: 'ri-bard-fill', color: 'text-yellow-400' },
    { to: '/movie', label: 'Movies', icon: 'ri-movie-2-ai-fill', color: 'text-teal-400' },
    { to: '/tv', label: 'TV Shows', icon: 'ri-slideshow-3-fill', color: 'text-zinc-400' },
    { to: '/person', label: 'People', icon: 'ri-team-fill', color: 'text-zinc-400' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Hamburger button — visible only on mobile/tablet */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1F1E24] text-white p-2.5 rounded-lg shadow-lg border border-zinc-700 hover:bg-[#6556CD] transition-colors duration-200"
        aria-label="Open navigation menu"
      >
        <i className="ri-menu-3-line text-xl"></i>
      </button>

      {/* Dark overlay — mobile/tablet only */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          w-64 bg-[#0D0D0D] border-r border-zinc-800
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-zinc-400 hover:text-white"
          aria-label="Close navigation menu"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Logo */}
        <div className="px-8 pt-8 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <i className="ri-tv-fill text-[#6556CD] text-2xl"></i>
            <h1 className="text-2xl text-white font-bold tracking-wider">NEXA</h1>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 gap-1 flex-1 overflow-y-auto">
          <h2 className="text-zinc-500 font-semibold text-xs uppercase tracking-widest px-4 mt-6 mb-3">
            New Feeds
          </h2>
          

          {navLinks.map(({ to, label, icon, color }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isActive(to)
                  ? 'bg-[#6556CD] text-white shadow-lg'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }
              `}
            >
              <i className={`${icon} ${isActive(to) ? 'text-white' : color} text-lg`}></i>
              <span>{label}</span>
              
            </Link>
            
          ))}
          <Link
 to="/watchlist"
 className="
 text-zinc-400
 font-medium
 hover:bg-zinc-800
 hover:text-white
 duration-300
 rounded-lg
 px-4 py-3
 "
>
 <i className="ri-bookmark-fill"></i>
 Watchlist
</Link>
      
        </nav>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs">Powered by TMDB API</p>
        </div>
      </aside>
    </>
  )
}

export default Sidenav