import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Stores';
import '../styles/Footer.scss';
import logo from '../assets/icons/principal.svg';

const Footer = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    }

    return (
        <div className='Footer'>
            {/* <div className='Footer__container'>
                <div className='Footer__container__datos'>
                    <h2 className='Footer__container__datos__title'>Servicio al cliente</h2>
                    <p className='Footer__container__datos__ciudad'>Huanta</p>
                    <p className='Footer__container__datos__ciudad'>Jr. Miguel Untiveros #314</p>
                    <p className='Footer__container__datos__ciudad'>miscky_coffee@gmail.com</p>
                    <p className='Footer__container__datos__ciudad'>915068001</p>

                </div>
                <div className='Footer__container__info'>
                    <h2 className='Footer__container__info__informacion'>Información</h2>
                    <p className='Footer__container__info__cuenta'>Mi cuenta</p>
                    <p className='Footer__container__info__cuenta'>Carrito</p>
                    <p className='Footer__container__info__cuenta'>Chequear</p>
                </div>
            </div> */}
            <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 md:gap-8 gap-4">
                    <div className="flex flex-col flex-shrink-0">
                        <div>
                           <img src={logo} alt=''/>
                        </div>
                        <p className="text-sm leading-none text-gray-800 mt-4">Copyright © 2022 Mi primera puntada</p>
                        <p className="text-sm leading-none text-gray-800 mt-4">All rights reserved</p>

                    </div>
                    <div className="sm:ml-0 ml-8">
                        <h2 className="text-base font-semibold leading-4 text-gray-800">Servicio al cliente</h2>
                        <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">Huanta</p>
                        <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">Jr. Miguel Untiveros #314</p>
                        <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">miscky_coffee@gmail.com</p>
                        <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">915068001</p>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className="text-base font-semibold leading-4 text-gray-800">Información</h2>
                        {userInfo ? (
                                <NavDropdown title={userInfo.name} id='basic-nav-dropdown' className='nombre_user text-dark flex justify-content-center align-items-center  font-montserrat font-normal text-xs '>
                                    <LinkContainer to='/profile' className='text-dark font-montserrat font-normal text-xs'>
                                        <NavDropdown.Item>Perfil de usuario</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orderHistory' className='text-black font-montserrat font-normal text-xs'>
                                        <NavDropdown.Item>Historial de órdenes</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <Link className='dropdown-item text-black font-montserrat font-normal text-xs' to='#signout'
                                        onClick={signoutHandler}>
                                        Cerrar sesión
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link className='nav-link text-black' to='/signin'>
                                    Iniciar sesión
                                </Link>
                            )}
                        <Link to='/cart' className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer no-underline">Carrito</Link>
                        <Link to='/shipping' className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer no-underline">Chequear</Link>
                    </div>

                </div>
            </div>
            <div className='font-montserrat bg-black  text-gray-400'>
                <h4 className='m-0 py-3 text-sm'>Desarrollado por el equipo de mi primera puntada</h4>
            </div>
        </div>
    );
}

export default Footer;