import React from 'react';
import '../styles/Card.scss';

const Card = ({icon,alt,title,desc}) => {
    return (
        <div className="cardRecomend">
        <div className="cardRecomend__principal">
            <div className="cardRecomend__principal__title">
                <img src={icon} alt={alt}/>
                <h4 className='cardRecomend__principal__title__principal font-montserrat  font-semibold'>{title}</h4>
            </div>
            <div className='cardRecomend__principal__descripcion'>
                <p className="cardRecomend__principal__descripcion__desc font-montserrat text-sm leading-4">
                {desc}
                </p>
            </div>
            </div>
        </div>
    );
}

export default Card;