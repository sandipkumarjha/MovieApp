import React from 'react'
import loader from '/loader.mp4'
const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-black'>
        <video className='h-[30%]' autoPlay muted loop src={loader}></video>
    </div>
  )
}

export default Loading 