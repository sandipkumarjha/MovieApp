import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import HorizontalCards from './templates/HorizontalCards'
import { removeperson } from '../../store/reducers/PersonSlice'
import { asyncloadperson } from '../../store/actions/PersonAction'

const Persondetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { info } = useSelector((state) => state.person)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncloadperson(id))
    return () => dispatch(removeperson())
  }, [id, dispatch])

  return info ? (
    <div className="bg-[#0D0D0D] min-h-screen text-white">

      {/* Sticky nav */}
      <nav className="
        flex gap-4 items-center
        px-4 sm:px-8 md:px-[6%] lg:px-[10%]
        py-4 sm:py-5
        border-b border-zinc-800
        sticky top-0 z-10
        bg-[#0D0D0D]/95 backdrop-blur-sm
      ">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] transition-colors p-1"
          aria-label="Go back"
        >
          <i className="ri-arrow-left-fill text-2xl"></i>
        </button>
        <span className="text-zinc-400 text-sm">Person Details</span>
      </nav>

      {/* Main content — stacked on mobile, side-by-side on sm+ */}
      <div className="
        px-4 sm:px-8 md:px-[6%] lg:px-[10%]
        py-6 sm:py-8
        flex flex-col sm:flex-row
        gap-6 sm:gap-8 md:gap-10
      ">

        {/* Left column: image + info */}
        <div className="flex-shrink-0 flex flex-col items-center sm:items-start sm:w-[220px] md:w-[260px]">
          <img
            className="
              w-40 h-40 sm:w-full sm:h-auto
              sm:aspect-[2/3]
              object-cover rounded-xl shadow-2xl
            "
            src={
              info?.detail?.profile_path
                ? `https://image.tmdb.org/t/p/w500/${info.detail.profile_path}`
                : 'https://placehold.co/300x450/1F1E24/6556CD?text=No+Image'
            }
            alt={info?.detail?.name || 'Person'}
          />

          <hr className="w-full border-zinc-700 mt-6 mb-4" />

          <div className="w-full space-y-3">
            <h2 className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">
              Person Info
            </h2>

            {info?.detail?.known_for_department && (
              <div>
                <span className="text-zinc-500 text-xs block">Known For</span>
                <p className="text-zinc-300 text-sm font-medium">
                  {info.detail.known_for_department}
                </p>
              </div>
            )}

            {info?.detail?.birthday && (
              <div>
                <span className="text-zinc-500 text-xs block">Birthday</span>
                <p className="text-zinc-300 text-sm">{info.detail.birthday}</p>
              </div>
            )}

            {info?.detail?.place_of_birth && (
              <div>
                <span className="text-zinc-500 text-xs block">Born in</span>
                <p className="text-zinc-300 text-sm">{info.detail.place_of_birth}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: biography + also known as */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-200 mb-4">
            {info?.detail?.name}
          </h1>

          <h2 className="text-xl text-zinc-400 font-semibold mb-2">Biography</h2>
          <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mb-6">
            {info?.detail?.biography
              ? info.detail.biography.slice(0, 600) + '...'
              : 'No biography available.'}
          </p>

          {info?.detail?.also_known_as?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg text-zinc-400 font-semibold mb-2">Also Known As</h2>
              <div className="flex flex-wrap gap-2">
                {info.detail.also_known_as.slice(0, 5).map((name, i) => (
                  <span key={i} className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credits carousel — full width */}
      {info?.combinedCredits?.cast?.length > 0 && (
        <div className="px-4 sm:px-8 md:px-[6%] lg:px-[10%] pb-10">
          <hr className="border-zinc-800 mb-6" />
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-4">Known For</h2>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      )}
    </div>
  ) : (
    <Loading />
  )
}

export default Persondetails