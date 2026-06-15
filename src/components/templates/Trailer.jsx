import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category = pathname.includes('movie') ? 'movie' : 'tv';
  const trailer = useSelector((state) => state[category]?.info?.videos?.trailer);

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') navigate(-1);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-6">

      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="
          absolute top-4 right-4 sm:top-6 sm:right-6
          text-white
          bg-zinc-800 hover:bg-[#6556CD]
          w-10 h-10 sm:w-12 sm:h-12
          flex items-center justify-center
          rounded-full text-xl sm:text-2xl
          transition-colors duration-200 z-10
        "
        aria-label="Close trailer"
      >
        ✕
      </button>

      {/* Responsive iframe container */}
      <div className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[900px] xl:max-w-[1100px]">
        {trailer ? (
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <i className="ri-film-line text-6xl text-zinc-600"></i>
            <p className="text-white text-xl font-semibold">No Trailer Available</p>
            <p className="text-zinc-400 text-sm">The trailer for this title hasn't been added yet.</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#6556CD] hover:bg-[#574bc4] text-white px-6 py-2.5 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trailer;