import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { Store } from '../Stores'
import '../styles/CartScreen.scss'
import axios from 'axios';
import { FaPlus, FaMinus } from "react-icons/fa";





export default function CartScreen({ product }) {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const updateCartHandler = async (item, quantity) => {
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.stock < quantity) {
			window.alert('Sorry. Product is out of stock');
			return;
		}

		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		});
	}

	const removeItemHandler = (item) => {
		ctxDispatch({
			type: 'CART_REMOVE_ITEM', payload: item
		});
	}

	const checkoutHanalder = () => {
		navigate('/signin?redirect=/shipping');
	};


	return (
		<>
			<Helmet>
				<title>Carrito de compras | Mi primera puntada</title>
			</Helmet>

			<div className="flex flex-col p-12 space-y-4 sm:p-20 font-carrois">
				<h2 className="font-semibold font-extrabold text-4xl leading-7">Tu carrito de compras</h2>
				{cartItems.length === 0 ? (

					<MessageBox>

						No tienes productos agregados al carrito <Link to='/'> Regresa al inicio y anímate a adquirir uno de nuestros  productos</Link>
					</MessageBox>
				)
					: (
						<ul className="flex flex-col divide-y divide-gray-700">
							{
								cartItems.map((item) => (
									<li className="flex flex-col py-6 sm:flex-row sm:justify-between" key={item._id}>
										<div className="flex w-full space-x-2 sm:space-x-4">
											<img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item.img}
												alt={item.slug} />
											<div className="flex flex-col justify-between w-full pb-4">
												<div className="flex justify-between w-full pb-2 space-x-2">
													<div className="space-y-1">
														<h3 className="text-lg font-medium leading-snug sm:pr-8 font-montserrat ">{item.title}</h3>
														<p className="text-sm ">
															<span className='Cart__item__container__options'>
																<button className='Cart__item__container__options__menos'
																	onClick={() => updateCartHandler(item, item.quantity - 1)}
																	disabled={item.quantity === 1}>
																	<FaMinus />
																</button>{' '}
																<span><strong className='font-montserrat'>{item.quantity}</strong></span>{' '}
																<button className='Cart__item__container__options__mas'
																	onClick={() => updateCartHandler(item, item.quantity + 1)}
																	disabled={item.quantity === item.stock}>
																	<FaPlus />
																</button>
															</span>
														</p>
													</div>
													<div className="text-right">
														<p className="text-lg font-semibold font-montserrat">S/. {item.price} {'.00'}</p>
														{/* <p className="text-sm line-through dark:text-gray-600 font-montserrat">75.50€</p> */}
													</div>
												</div>
												<div className="flex text-sm divide-x">
													<button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => removeItemHandler(item)} >
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
															<path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
															<rect width="32" height="200" x="168" y="216"></rect>
															<rect width="32" height="200" x="240" y="216"></rect>
															<rect width="32" height="200" x="312" y="216"></rect>
															<path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
														</svg>
														<span className='font-montserrat text-sm font-normal leading-6'>Eliminar</span>
													</button>
												</div>
											</div>
										</div>
									</li>
								))}
						</ul>
					)}
				<div className="space-y-1 text-right font-montserrat">
					<p>Cantidad total: 
						<span className="font-semibold font-montserrat"> S/. {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} {'.00'}</span>
					</p>
					<p className="text-sm dark:text-gray-400 font-montserrat">Envios gratis a todo el peru</p>
				</div>
				<div className="flex justify-end space-x-4">
					<Link to={`/`} className='px-6 py-2  dark:border-violet-400 no-underline border rounded-md  font-montserrat font-normal text-stone-900 hover:bg-neutral-900  hover:text-neutral-50'>
					Atrás
					<span className="sr-only sm:not-sr-only"></span>
					</Link>
						
					<button type="button" className="px-6 py-2 border-neutral-900 border-2  rounded-md bg-stone-900 text-neutral-50  font-montserrat font-normal hover:bg-slate-50 hover:text-stone-900  hover:border-neutral-900" onClick={checkoutHanalder}
						disabled={cartItems.length === 0}>
						<span className="sr-only sm:not-sr-only ">Continuar </span>compra
					</button>
				</div>
			</div>
		</>
	)
}
