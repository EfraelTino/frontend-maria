import React from 'react';
import CardMayor from './CardMayor';
import devolucion from '../assets/icons/devolucion.svg'
import VerProduct from './VerProduct';
import chanchito from '../assets/icons/chanchit.svg';
import '../styles/Mayor.scss';

const Mayor = () => {
    return (
        <section className='Mayor'>
            <div className='Mayor__primero'>
                <h2 className='Mayor__primero__title flex justify-center font-carrois font-bold leading-7 text-center pt-4'> Compra al por mayor </h2>
                <p className='Mayor__primero__desc flex justify-center font-montserrat font-light leading-4 pb-4 font-sm'>Ahora ya puedes, aprovecha</p>
            </div>
            <div className='Mayor__container'>
            <div className='Mayor__card'>
                <CardMayor
                    title_mayor='Devolucions gratuitas'
                    image={devolucion}
                    name_img='devoluciones'
                    desc='Para comprar sin riesgo'
                />
            </div>
            <div className='Mayor__card'>
                <CardMayor
                    title_mayor='Condiciones de pago a 60 días'
                    image={chanchito}
                    name_img='chanchito'
                    desc='Para pagar sin estrés'
                />
            </div>
            </div>
            <p className='Mayor__primero__acumular font-montserrat font-light leading-4 pb-4 font-sm'>Acumula puntos para obtener descuentos en nuestro black friday, más envíos gratuitos con nosotros durante todo un año</p>
            {/* <VerProduct producto={'COMPRAR AL POR MAYOR'}/> */}
        </section>
    );
}

export default Mayor;