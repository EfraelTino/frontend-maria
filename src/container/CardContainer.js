import React from 'react';
import Card from '../components/Car';
import '../styles/Card.scss'

const CardContainer = () => {
    return (
        <section className='CardContainer'>
            <Card icon={'https://cdn.shopify.com/s/files/1/0422/2317/3782/files/icon-compra-segura_60x.png?v=1614285184'} alt='seguro' title='Compra fácil y seguro' desc='Tus compras en MaryHelen están respaldadas y son 100% seguras.'/>
            <Card icon={'https://cdn.shopify.com/s/files/1/0422/2317/3782/files/icon-medios-pagopng_60x.png?v=1614285194'} alt='moneda' title='Medios de pago por Paypal' desc='Aceptamos todas las tarjetas de crédito y débito. También puedes pagar con Yape o Transferencia Bancaria.'/>
            <Card icon={'https://cdn.shopify.com/s/files/1/0422/2317/3782/files/icon-envios-lima_60x.png?v=1614285195'} alt='carro' title='Envíos a todo el Perú' desc='¡Recibe tu pedido en Lima y Callao en menos de 48h! Realiza tus compras y nosotros nos encargamos de llevártelo donde estés.'/>
        </section>
    );
}

export default CardContainer;