import React from 'react'

const Gallery = () => {
  return (
    <div className='flex flex-col  gap-10 justify-center items-center mt-20'>
        <h1 className='text-4xl text-black font-semibold uppercase'>Gallery</h1>
      <div className='flex gap-12'>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-1.jpg" alt="" className='w-[400px]'/>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-2.jpg" alt="" className='w-[400px]'/>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg" alt="" className='w-[400px]'/>
      </div>
      <div className='flex gap-12'>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-4.jpg" alt="" className='w-[400px]'/>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-5.jpg" alt="" className='w-[400px]'/>
        <img src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-6.jpg" alt="" className='w-[400px]'/>
      </div>
    </div>
  )
}

export default Gallery
