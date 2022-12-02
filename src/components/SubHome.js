import React from 'react'
import '../styles/SubHome.scss'
import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'
import slider1 from '../assets/img/pexels-photo-1937336.jpeg'

const SubHome = () => {



  return (
    <>
      {/* <div className='SubHome'>
        <div className='SubHome__container'>
          <h1 className='SubHome__container__text'>
            Ropas de alta calidad "Mary Helen"
          </h1>
        </div>
      </div> */}
      <CCarousel controls  transition="crossfade" className='mt-4'>
        <CCarouselItem className='h-full sm:mt-5'>
          <img  src={slider1} alt="slide 1" className='w-100'/>
          <CCarouselCaption className="d-md-block bottom-0 ">
            <h6 className='font-carrois font-bold text-3xl  sm:text-5x1 sm:mt-1.5 md:text-7x1 lg:text-7xl xl:text-9x1 m-0'> Mi primera puntada </h6>
            <p className='font-montserrat font-xs text-base font-semibold lg:text-7x1 xl:text-9x1'>Ropas de alta calidad</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <img  src="http://blog.redbus.pe/wp-content/uploads/2022/08/Plaza-de-Armas-Huanta.jpg" alt="slide 2" className='w-100' />
          <CCarouselCaption className=" d-md-block bottom-0">
            <h6 className='font-carrois font-semibold text-3xl  sm:text-5x1 sm:mt-1.5 md:text-7x1 lg:text-7xl xl:text-9x1 m-0'>Bella Esmeralada de los Andes</h6>
            <p className='font-montserrat font-xs text-base font-semibold lg:text-7x1 xl:text-9x1'>Producido por tejedoras en la bella esmeralda de los andes.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <img src="https://cdn.shopify.com/s/files/1/1882/5209/files/Tejido_a_la_cintura_d538f7e6-9d82-47cc-bbac-e000fa6b26f6_large.jpg?v=1499872790" alt="slide 3" className='w-100'/>
          <CCarouselCaption className=" d-md-block">
            <h6 className='font-carrois font-semibold text-3xl  sm:text-5x1 sm:mt-1.5 md:text-7x1 lg:text-7xl xl:text-9x1 m-0'>Plasmando Arte</h6>
            <p className='font-montserrat font-xs text-base font-semibold lg:text-7x1 xl:text-9x1'>Hecho con las mejores manos.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </>
  );
}

export default SubHome;