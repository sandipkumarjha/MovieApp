import React from 'react'
import loader from '/loader.mp4'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <video
        className='w-24 h-24 md:w-32 md:h-32 object-contain'
        autoPlay
        muted
        loop
        src={loader}
      />
    </div>
  )
}

export default Loading