import React from 'react';
import '../styles/Intro.scss';

const Intro = () => {
    return (
        <div className='Intro'>
            <div className='Intro__desc'>
                <h2 children className='Intro__desc__title font-carrois text-3xl font-bold text-center leading-7 text-white'>Nuestros productos más exclusivos</h2>
                <p className='text-white font-montserrat pt-5 text-base leading-5 font-extralight text-justify'> <strong>Exclusividad, tradición y compromiso en cada puntada.
                    Nuestra selección de las fibras más finas y exclusivas de los Andes
                    son un referente de sostenibilidad, calidad y lujo;
                    atributos que finamente tejemos en nuestras más icónicas y lujosas líneas.
                    <br/>
                    <br/>
                    Nuestra misión es dar a conocer al mundo los mejores productos textiles peruanos fabricados en lana, producidos en nuestra región.</strong>
                    <br/>
                    <br/>
                    <strong>Vendemos productos con alma, producido para personas que valoran las cosas únicas, diferentes, artesanales, en pequeña escala, productos de calidad, duraderos y respetuosos con el medio ambiente.</strong></p>
            </div>
            <div className='Intro__img__container'>
            <div className='Intro__img'>
                <img src='https://solalpaca.pe/wp-content/uploads/2022/06/sol-alpaca_super-bay.jpg' alt='modelo_uno' />
            </div>
            <div className='Intro__img'>
                <img src='https://solalpaca.pe/wp-content/uploads/2022/06/sol-alpaca_tributo.jpg' alt='modelo_uno' />
            </div>
            </div>
        </div>
    );
}

export default Intro;