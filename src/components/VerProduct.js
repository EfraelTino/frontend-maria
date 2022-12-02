    import React from 'react';
    import '../styles/VerProducto.scss';
    const VerProduct = ({producto}) => {
        return (
            <section className='ContainerVerMas '>
                <button className='ContainerVerMas__button flex justify-center items-center no-underline font-carrois font-bold leading-6 tracking-normal text-lg'>{producto}</button>
            </section>
        );
    }
    
    export default VerProduct;