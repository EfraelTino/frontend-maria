import React, { useContext, useEffect, useState } from 'react'
import { Badge, NavDropdown, } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Stores';
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import addtocart from '../assets/icons/cart.svg'
import '../styles/Header.scss';
import '../styles/Prueba.scss';
import principal from '../assets/icons/principal.svg';



const header = [
    { id: 1, name: 'Inicio', to: '/' },
    { id: 2, name: 'Productos', to: '/products' },
    { id: 3, name: 'Sobre nosotros', to: '/about-us' },
];


export default function Header() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    }
    const [menu, setMenu] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //para que cuando sea mayor de 768px desaparezca nuestro toggle
    useEffect(() => {
        if (size.width > 768 && menu) {
            setMenu(false);
        }
    }, [size.width, menu]);
    const toogleNav = () => {
        setMenu((p) => !p);
    }
    return (
        <>


            <div className='container_header '>
                <header className='header' id='header'>
                    <ToastContainer position='bottom-center' limit={1} />
                    <div className='header__content '>
                        <Link role='link' to='/' className='header__content_logo text-black'> <img src={principal} alt='logo'/></Link>
                        <Link to='/cart' className='cart-one '>
                                {cart.cartItems.length > 0 && (
                                    <div className="navbar-shopping-cart">
                                        <Badge className='bg-warning'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>
                                    </div>
                                )}
                                <img src={addtocart} alt='add-to-cart' />
                            </Link>
                        <nav className={`${'header__content__nav'} ${menu ? 'isMenu' : ''}`}>
                        <Link to='/cart' className='cart-two'>
                                {cart.cartItems.length > 0 && (
                                    <div className="navbar-shopping-cart">
                                        <Badge className='bg-warning position-absolute rounded-circle'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>
                                    </div>
                                )}
                                <img src={addtocart} alt='add-to-cart' />
                            </Link>
                            {header.map((item) => (
                                <ul key={item.id} className='lista'> <li className='lista_header text-black  font-montserrat' ><Link to={item.to} className='items font-normal text-xs'>{item.name}</Link></li></ul>
                            ))}
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
                                <Link className='nav-link  small ' to='/signin'>
                                    Iniciar sesión
                                </Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='admin-nav-dropdown' className='text-black'>
                                    <LinkContainer to='/dashboard' className='text-black'>
                                        <NavDropdown.Item className='text-black'>Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/productlist'>
                                        <NavDropdown.Item className='text-black'>Productos</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orderlist'>
                                        <NavDropdown.Item className='text-black'>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/userlist'>
                                        <NavDropdown.Item className='text-black'>User</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </nav>
                        <div className='header__content__toggle'>
                            {!menu ? <AiOutlineClose onClick={toogleNav} /> : <BiMenuAltRight onClick={toogleNav} />}
                        </div>
                        {/* <button onClick={toogleNav} className='Burger'> <img src={burguer} alt={burguer} /> </button> */}
                    </div>
                </header>
            </div>
            {/* <div className="flex items-center justify-between w-full ">
                <div className="w-6/12 lg:w-2/12 flex items-center gap-2 pl-6">
                    <div className="bg-gray-900 w-6 h-6 rounded-full"></div>
                    <Link role='link' to='/' className="text-xl font-bold text-black"> MaryHelen </Link>
                </div>
                <nav className="hidden w-6/12 lg:flex justify-center items-center gap-8 text-gray-500 font-medium">
                    <Link
                        to=''
                        className="text-gray-900 hover:text-gray-900 transition-colors"
                    >
                        Inicio
                    </Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors">
                        Productos
                    </Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors">
                        Sobre nosotros
                    </Link>
                </nav>
                <div className="hidden w-4/12 lg:flex justify-center items-center gap-8">
                    <button type="button" className="py-2 px-4">
                        <Link to='/cart' className='nav-link'>
                        
                            {cart.cartItems.length > 0 && (
                                <Badge pill bg="danger">
                                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                </Badge>
                            )}
                            <img src={addtocart} alt='add-to-cart' />
                        </Link>
                    </button>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='basic-nav-dropdown' className='nombre_user'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Perfil de usuario</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orderHistory'>
                                        <NavDropdown.Item>Historial de órdenes</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <Link className='dropdown-item' to='#signout'
                                        onClick={signoutHandler}>
                                        Cerrar sesión
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link className='nav-link' to='/signin'>
                                    Iniciar sesión
                                </Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='admin-nav-dropdown'>
                                    <LinkContainer to='/dashboard'>
                                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/productlist'>
                                        <NavDropdown.Item>Productos</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/userlist'>
                                        <NavDropdown.Item>User</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                </div>

                <div className='header__content__toggle pr-5'>
                            {!menu ? <BiMenuAltRight onClick={toogleNav} /> : <AiOutlineClose onClick={toogleNav} />}
                </div>
                </div> */}

        </>
    )
}
