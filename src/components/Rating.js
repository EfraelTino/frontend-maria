import React from 'react'

export default function Rating({rating, numReviews}) {
  return (
    <div>
      <span className='text-[#facc15]'>
        <i className= {
            rating >= 1
            ? 'fas fa-star'
            : rating >= 0.5 
            ? 'fas fa-star-half-alt'
            : 'far fa-star'} />
      </span>
      <span className='text-[#facc15]'>
        <i className= {
            rating >= 2
            ? 'fas fa-star'
            : rating >= 1.5 
            ? 'fas fa-star-half-alt'
            : 'far fa-star'} />
      </span>
      <span className='text-[#facc15]'>
        <i className= {
            rating >= 3
            ? 'fas fa-star'
            : rating >= 2.5 
            ? 'fas fa-star-half-alt'
            : 'far fa-star'} />
      </span>
      <span className='text-[#facc15]'>
        <i className= {
            rating >= 4
            ? 'fas fa-star'
            : rating >= 3.5 
            ? 'fas fa-star-half-alt'
            : 'far fa-star'} />
      </span>
      <span className='text-[#facc15]'>
        <i className= {
            rating >= 5
            ? 'fas fa-star'
            : rating >= 4.5 
            ? 'fas fa-star-half-alt'
            : 'far fa-star'} />
      </span>
      <span className='text-[#facc15] font-montserrat font-light'> {numReviews} <span> {' '} </span> vistos</span>
    </div>
  )
}
