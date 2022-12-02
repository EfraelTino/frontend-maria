import React from 'react';
import '../styles/Mayor.scss';
const CardMayor = ({ image, name_img, desc, title_mayor }) => {
    return (
        <article className='CardMayor'>
            <img src={image} alt={name_img} className='CardMayor__image'/>
            <h4 className='CardMayor__title flex font-semibold text-lg justify-center font-montserrat'> {title_mayor}</h4>
            <p className='CardMayor__desc flex justify-center text-sm' >{desc}</p>
        </article>
    );
}

export default CardMayor;