import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category = pathname.includes("movie") ? "movie" : "tv";

  const trailer = useSelector(
    (state) => state.movie.info.videos.trailer
  );

  

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/95 z-[9999] flex items-center justify-center">

      {/* Close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 right-10 text-white text-3xl"
      >
        ✖
      </button>

      {trailer ? (
        <iframe
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="Trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
        
      ></iframe>
      ) : (
        <p className="text-white">No Trailer Found</p>
      )}
    </div>
  );
};

export default Trailer;