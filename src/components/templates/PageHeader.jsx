import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './TopNav'
import Dropdown from './DropDown'
const PageHeader = ({ title, dropdowns = [] }) => {
  const navigate = useNavigate()

  return (
    <div className="
      sticky top-0 z-30
      bg-[#0D0D0D]/95 backdrop-blur-sm
      border-b border-zinc-800
      px-4 sm:px-6
      pt-16 lg:pt-3 pb-3
    ">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">

        {/* Back button + Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-[#6556CD] transition-colors p-1"
            aria-label="Go back"
          >
            <i className="ri-arrow-left-fill text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-zinc-300 whitespace-nowrap">
            {title}
          </h1>
        </div>

        {/* Search bar — grows to fill remaining space */}
        <div className="flex-1 min-w-[180px]">
          <TopNav />
        </div>

        {/* Dropdowns */}
        {dropdowns.length > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {dropdowns.map((d, i) => (
              <Dropdown key={i} title={d.title} options={d.options} func={d.func} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageHeader