import React from 'react'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/img/logo.png';
import ceo from '../assets/img/ceo.webp';
import lugar from '../assets/img/huanta.png';
import senio from '../assets/img/senio.webp';
import mano from '../assets/img/mano.webp';
import ninia from '../assets/img/ninia.webp';

const nostros = [
  {id:1, src: logo, alt:"logo", titulo:"Mi primera puntada ", desc:"En Mi primera puntada estamos comprometidos con la producción responsable, preservar el legado cultural y generar una vida sustentable a las comunidades con las que trabajamos."},
  {id:2, src: ceo, alt:"ceo", titulo:"CEO de Mi primera puntada  ", desc:"Efrael Junior, CEO de Mi primera puntada, dio el primer paso para el emprendimiento de la venta de ropa de lana con la finalidad de brindar calidad a nuestros clientes."},
  {id:3, src: lugar, alt:"lugar", titulo:"Huanta - Perú ", desc:"Huanta la bella Esmeralda de los Andes, es una provincia importante en crianza de llamas y obejas para extraer lana para nuestra producción."},
];
const produccion = [
  {id:1, src: mano, alt:"mano", titulo:"Tejido a mano", desc:"Gracias a nuestros programas de capacitación especializados en tejido a mano y telar es que podemos elaborar delicadas prendas hechas en fibras naturales."},
  {id:2, src: ninia, alt:"ninia", titulo:"Fundación Mi primera puntada ", desc:"Tenemos el objetivo de crear nuestra fundación Mi primera puntada, continuamos con la misión de apoyar a más mujeres y niños en su camino de desarrollo."},
  {id:3, src: senio, alt:"señora", titulo:"Nuestras Talentosas Mujeres ", desc:"Le damos poder a quienes lo merecen y nos inspiramos en las diferencias que hacen únicas a las mujeres de distintos orígenes y estilos de vida."},
]
export default function AboutUs() {
  return (
    <div className='mt-12'>
    <Helmet>
       <title>Nosotros | Mi primera puntada</title>
    </Helmet>
    <div className='pt-5 sm:mx-5 lg:mx-12'>
      <h2 className='font-montserrat text-lg font-bold leading-none underline underline-offset-8  '>¿Quiénes somos?</h2>
      <p className='font-montserrat mx-2 lg:px-12 text-sm text-justify lg:text-center'>Somos una marca de Alpaca que nació en Arequipa y nuestro compromiso es ayudar a más mujeres peruanas integrándolas en nuestra cadena de suministro como brillantes artesanas poseedoras de antiguos conocimientos textiles.</p>
    </div>
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 sm:mx-5 lg:mx-12'>
    {nostros.map((item) => (
      <div key={item.id} className='mx-2 '>
      <img src={item.src} alt={item.alt}/>
      <h3 className='mt-1 font-carrois font-normal text-lg'>{item.titulo}</h3>
      <p className='mt-2 font-montserrat text-xs text-justify'>{item.desc}</p>
      </div>
    ))}
    </div>
    <div className='pt-5 sm:mx-5 lg:mx-12'>
      <h2 className='font-montserrat text-lg font-bold leading-none underline underline-offset-8 '>Nuestros métodos de producción</h2>
      <p className='font-montserrat mx-2 lg:px-12 text-sm '>Nuestras prendas están hechas con el más alto nivel de calidad y contribuyendo a mejorar el impacto ambiental.</p>
    </div>
    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 sm:mx-5 lg:mx-12'>
    {produccion.map((item) => (
      <div key={item.id} className='mx-2 '>
      <img src={item.src} alt={item.alt}/>
      <h3 className='mt-1 font-carrois font-normal text-lg'>{item.titulo}</h3>
      <p className='mt-2 font-montserrat text-xs text-justify'>{item.desc}</p>
      </div>
    ))}
    </div>
    </div>
  )
}
