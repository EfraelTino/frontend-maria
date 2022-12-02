import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Button, } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckOutSteps from '../components/CheckOutSteps'
import LandingBox from '../components/LandingBox'
import { Store } from '../Stores'
import { getError } from '../util'
import bandera from '../assets/icons/banera.svg';

const reducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_REQUEST':
			return { ...state, loading: true };
		case 'CREATE_SUCCESS':
			return { ...state, loading: false };
		case 'CREATE_FAIL':
			return { ...state, loading: false };
		default:
			return state;
	}
}

export default function PlaceOrder() {
	const navigate = useNavigate();

	const [{ loading }, dispatch] = useReducer(reducer, {
		loading: false,
	})

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	cart.itemsPrice = round2(
		cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	);
	cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(0);
	cart.taxPrice = round2(0.18 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const placeOrderHandler = async () => {
		try {
			dispatch({ type: 'CREATE_REQUEST' });

			const { data } = await axios.post(
				'/api/orders',
				{
					orderItems: cart.cartItems,
					shippingAddress: cart.shippingAddress,
					paymentMethod: cart.paymentMethod,
					itemsPrice: cart.itemsPrice,
					shippingPrice: cart.shippingPrice,
					taxPrice: cart.taxPrice,
					totalPrice: cart.totalPrice,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.token}`,
					},
				}
			);
			ctxDispatch({ type: 'CART_CLEAR' });
			dispatch({ type: 'CREATE_SUCCESS' });
			localStorage.removeItem('cartItems');
			navigate(`/order/${data.order._id}`);
		} catch (err) {
			dispatch({ type: 'CREATE_FAIL' });
			toast.error(getError(err));
		}
	};
	var fecha = new Date();
	var options = { year: 'numeric', month: 'long', day: 'numeric' };


	useEffect(() => {
		if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart, navigate]);

	return (
		<>
			<div>
				<CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
				<Helmet>
					<title>Lista de compras | Mi primera puntada</title>
				</Helmet>
				{/* <Row>
					<Col md={8}>
						<Card className='mb-3'>
							<Card.Body>
								<Card.Title>Envío</Card.Title>
								<Card.Text>
									<strong>Nombre:</strong> {cart.shippingAddress.fullName}<br />
									<strong>Dirección:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
								</Card.Text>
								<Link to='/shipping'>Editar</Link>
							</Card.Body>
						</Card>
						<Card className='mb-3'>
							<Card.Body>
								<Card.Title>Método de pago</Card.Title>
								<Card.Text>
									<strong>Método:</strong>{cart.paymentMethod}
								</Card.Text>
								<Link to='payment'>Editar</Link>
							</Card.Body>
						</Card>
						<Card className='mb-3'>
							<Card.Body>
								<Card.Title>Productos a comprar</Card.Title>
								<ListGroup variant='flush'>
									{cart.cartItems.map((item) => (
										<ListGroup.Item key={item._id} >
											<Row className='align-items-center'>
												<Col md={6}>
													<img src={item.img} alt={item.title}
														className='img-fluid rounded img-thumbnail'
													></img> {' '}
													<Link to={`/product/${item.slug}`}>{item.title}</Link>
												</Col>
												<Col md={3}>{item.quantity}</Col>
												<Col md={3}>{item.price}</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
								<Link to='/cart'>Editar</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card.Body>
							<Card.Title>Suma de la orden</Card.Title>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Producos</Col>
										<Col>S/.{cart.itemsPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Costo de envío</Col>
										<Col>S/.{cart.shippingPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Impuesto</Col>
										<Col>S/.{cart.taxPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Orden total</Col>
										<Col><strong>S/.{cart.totalPrice.toFixed(2)}</strong></Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<div className='d-grid'>
										<Button type='button' onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} variant='warning'>
											Continuar orden
										</Button>
										{loading && <LandingBox></LandingBox>}
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Col>
				</Row> */}
			</div>
			<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
				<div className="flex justify-start item-start space-y-2 flex-col ">
					<h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800 font-carrois">Vista previa del pedido</h1>
					<p className="text-base font-medium leading-6 text-gray-600 font-montserrat">{fecha.toLocaleDateString("es-ES", options)}</p>
				</div>
				<div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
					<div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
						<div className="flex flex-col justify-start items-start  bg-slate-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
							<p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 font-montserrat">Carrito del cliente</p>
							{cart.cartItems.map((item) => (
								<div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full " key={item._id}>
									<div className="pb-4 md:pb-8 w-full md:w-40" key={item._id} >
										<img className="w-full hidden md:block" src={item.img} alt="dress" />
										<img className="w-full md:hidden" src={item.img} alt="dress" />
									</div>
									<div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
										<div className="w-full flex flex-col justify-start items-start space-y-8">
											<h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800"><Link to={`/product/${item.slug}`} className='no-underline font-montserrat'>{item.title}</Link></h3>
											<div className="flex justify-start items-start flex-col space-y-2">
												<p className="text-sm leading-none text-gray-800 font-montserrat">
													<span className="text-gray-300 font-montserrat"><strong>Categoria: </strong> </span> {item.category}
												</p>
												<p className="text-sm leading-none text-gray-800 font-montserrat">
													<span className="text-gray-300"><strong>Talla: </strong> </span> {item.talla}
												</p>

											</div>
										</div>
										<div className="flex justify-between space-x-8 items-start w-full font-montserrat">
											<p className="text-base xl:text-lg leading-6 font-montserrat">S/.
												{item.price}{' .00'}
											</p>
											<p className="text-base xl:text-lg leading-6 text-gray-800 font-montserrat">{item.quantity}</p>
											<p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">S/.{(item.price) * item.quantity} {' .00'}</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
							<div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-slate-100 space-y-6   ">
								<h3 className="text-xl font-semibold leading-5 text-gray-800 font-montserrat">Resumen</h3>
								<div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
									<div className="flex justify-between  w-full">
										<p className="text-base leading-4 text-gray-800 font-montserrat">Subtotal</p>
										<p className="text-base leading-4 text-gray-600">{cart.itemsPrice.toFixed(2)}</p>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base leading-4 text-gray-800 font-montserrat">
											Costo de  <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800 font-montserrat">Impuesto</span>
										</p>
										<p className="text-base leading-4 text-gray-600 font-montserrat">S/.{cart.taxPrice.toFixed(2)}</p>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base leading-4 text-gray-800 font-montserrat">Envío</p>
										<p className="text-base leading-4 text-gray-600 font-montserrat">S/. {cart.shippingPrice.toFixed(2)}</p>
									</div>
								</div>
								<div className="flex justify-between items-center w-full">
									<p className="text-base font-semibold leading-4 text-gray-800 font-montserrat">Total</p>
									<p className="text-base font-meduim leading-4 text-gray-600 font-montserrat"><strong>S/.{cart.totalPrice.toFixed(2)}</strong></p>
								</div>
							</div>
							<div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-slate-100 space-y-6   ">
								<h3 className="text-xl font-semibold leading-5 text-gray-800 font-montserrat">Transporte </h3>
								<div className="flex justify-between items-start w-full">
									<div className="flex justify-center items-center space-x-4">
										<div className="w-8 h-8">
											<img className="w-full h-full flex justify-center items-center" alt="logo" src={bandera} />
										</div>
										<div className="flex flex-col justify-start items-center">
											<p className="text-lg leading-6 font-semibold text-gray-800 font-montserrat">
												Consto de envío
												<br />
												<span className="font-normal font-montserrat">Entrega en tres días aprox.	</span>
											</p>
										</div>
									</div>
									<p className="text-lg font-semibold leading-6 text-gray-800 font-montserrat">S/. {cart.shippingPrice.toFixed(2)}</p>
								</div>
								<div className="flex justify-between items-start w-full">
									<div className="flex justify-center items-center space-x-4">
										<div className="w-8 h-8">
											<img className="w-full h-full flex justify-center items-center" alt="logo" src={bandera} />
										</div>
										<div className="flex flex-col justify-start items-center">
											<p className="text-lg leading-6 font-semibold text-gray-800 font-montserrat">
												Método de pago
											</p>
										</div>
									</div>
									<p className="text-lg font-semibold leading-6 text-gray-800">{cart.paymentMethod}</p>
								</div>
								<div className="w-full flex justify-center items-center">
									<Link to='/payment' className='no-underline font-montserrat font-montserrat no-underline mt-6 md:mt-0 py-3 bg-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-neutral-900 hover:text-neutral-600'>Editar</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-slate-100 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
						<h3 className="text-xl font-semibold leading-5 text-gray-800 font-montserrat">Cliente: </h3>
						<div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
							<div className="flex flex-col justify-start items-start flex-shrink-0">
								<div className="flex justify-between  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
									<div className=" flex justify-between items-start flex-col space-y-2">
										<p className="text-sm leading-5 text-gray-600 font-montserrat" >{cart.shippingAddress.fullName}</p>
									</div>
								</div>
							</div>
							<div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
								<div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
									<div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
										<p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 font-montserrat">Dirección de envío</p>
										<p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 font-montserrat">{cart.shippingAddress.address}</p>
									</div>
									<div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
										<p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Ciudad de envío</p>
										<p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 font-montserrat">{cart.shippingAddress.country}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},</p>
									</div>
								</div>
								<div className="flex w-full justify-center items-center md:justify-start md:items-start">
									<Link to='/shipping ' className='font-montserrat no-underline mt-6 md:mt-0 py-3 bg-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-neutral-900 hover:text-neutral-600'>Editar</Link>
								</div>
								<div className='d-grid my-2'>
									<Button type='button' onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} variant='warning' className='font-montserrat'>
										Continuar orden
									</Button>
									{loading && <LandingBox></LandingBox>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
