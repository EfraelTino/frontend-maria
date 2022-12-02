import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {  ListGroup} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import LandinBox from '../components/LandingBox'
import MessageBox from '../components/MessageBox';
import { Store } from '../Stores'
import { getError } from '../util';
import { toast } from 'react-toastify';
import pagos from '../assets/icons/pagos.svg';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		case 'PAY_REQUEST':
			return { ...state, loadingPay: true }
		case 'PAY_SUCCESS':
			return { ...state, loadingPay: false, successPay: true };
		case 'PAY_FAIL':
			return { ...state, loadingPay: false, errorPay: action.payload };
		case 'PAY_RESET':
			return { ...state, loadingPay: false, successPay: false };
		default:
			return state;
	}
}
export default function OrderScreen() {
	const { state } = useContext(Store);
	const { userInfo } = state;

	const navigate = useNavigate();
	const params = useParams();
	const { id: orderId } = params;

	const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
		successPay: false,
		loadingPay: false,
	});

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [{
					amount: { value: order.totalPrice },
				},],
			})
			.then((orderID) => {
				return orderID;
			});
	}

	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				dispatch({ type: 'PAY_REQUEST' });
				const { data } = await axios.put(
					`/api/orders/${order._id}/pay`,
					details,
					{
						headers: { authorization: `Bearer ${userInfo.token}` }
					}
				);
				dispatch({ type: 'PAY_SUCCESS', payload: data });
				toast.success('Order is paid');
			} catch (error) {
				dispatch({ type: 'PAY_FAIL', payload: getError(error) });
				toast.error(getError(error))
			}
		});
	};

	function onError(err) {
		toast.error(getError(err));
	};

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (error) {
				dispatch({ type: 'FECTH_FAIL', payload: getError(error) });
			}
		}
		if (!userInfo) {
			return navigate('/login')
		}
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: 'PAY_RESET' });
			}
		} else {
			const loadPayPalScript = async () => {
				const { data: clientId } = await axios.get('/api/keys/paypal', {
					headers: { authorization: `Bearer${userInfo.token}` }
				});
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': clientId,
						'currency': 'USD',
					}
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });

			}
			loadPayPalScript();
		}
	}, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);
	return (
		loading
			? (<LandinBox></LandinBox>)
			: error
				? (
					<MessageBox variant='danger'>{error}</MessageBox>
				)
				: (
					<div className='my-12'>
						<Helmet>
							<title> Orden{orderId} </title>
						</Helmet>
						<h1 className='py-12' >Orden {orderId}</h1>
						{/* <Row>
							<Col md={8} >
								<Card className='mb-3'>
									<Card.Body>
										<Card.Title> Envío </Card.Title>
										<Card.Text>
											<strong>Nombre: </strong>{order.shippingAddress.fullName}<br />
											<strong>Dirección: </strong>{order.shippingAddress.address},
											{order.shippingAddress.city}, {order.shippingAddress.postalCode},{order.shippingAddress.country}
										</Card.Text>
										{order.isDelivered ? (
											<MessageBox variant='success'>
												Envió para {order.deliverdAt}
											</MessageBox>
										)
											: (
												<MessageBox variant='danger'>Not Delivered</MessageBox>
											)
										}
									</Card.Body>
								</Card>
								<Card className='mb-3'>
									<Card.Body>
										<Card.Title> Método de pago </Card.Title>
										<Card.Text>
											<strong>Método: </strong>{order.paymentMethod}<br />
										</Card.Text>
										{order.isPaid ? (
											<MessageBox variant='success'>
												Paid at {order.paidAt}
											</MessageBox>
										)
											: (
												<MessageBox variant='danger'>Not Paid</MessageBox>
											)
										}
									</Card.Body>
								</Card>
								<Card className='mb-3'>
									<Card.Body>
										<Card.Title> Productos </Card.Title>
										<ListGroup variant='flush'>
											{order.orderItems.map((item) => (
												<ListGroup.Item key={item._id}>
													<Row className='align-items-center' >
														<Col md={6}>
															<img
																src={item.img}
																alt={item.title}
																className='img-fluid rounded img-thumbnail'
															></img> {' '}
															<Link to={`/product/${item.slug}`}>{item.title}</Link>
														</Col>
														<Col md={3}>
															<span>{item.quantity}</span>
														</Col>
														<Col md={3}>{item.price}</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
										<Card.Text>
											<strong>Método: </strong>{order.paymentMethod}<br />
										</Card.Text>
										{order.isPaid ? (
											<MessageBox variant='success'>
												Paid at {order.paidAt}
											</MessageBox>
										)
											: (
												<MessageBox variant='danger'>Not Paid</MessageBox>
											)
										}
									</Card.Body>
								</Card>
							</Col>
							<Col md={4}>
								<Col md={12}>
									<Card className='mb-3'>
										<Card.Body>
											<Card.Title>Suma total</Card.Title>
											<ListGroup variant='flush'>
												<ListGroup.Item>
													<Row>
														<Col>Items</Col>
														<Col>S/. {order.itemsPrice.toFixed(2)}</Col>
													</Row>
												</ListGroup.Item>
												<ListGroup.Item>
													<Row>
														<Col>Shipping</Col>
														<Col>S/. {order.shippingPrice.toFixed(2)}</Col>
													</Row>
												</ListGroup.Item>
												<ListGroup.Item>
													<Row>
														<Col>Tax</Col>
														<Col>S/. {order.taxPrice.toFixed(2)}</Col>
													</Row>
												</ListGroup.Item>
												<ListGroup.Item>
													<Row>
														<Col>
															<strong> Order Total</strong>
														</Col>
														<Col>
															<strong>${order.totalPrice.toFixed(2)}</strong>
														</Col>
													</Row>
												</ListGroup.Item>
												{!order.isPaid && (
													<ListGroup.Item>
														{isPending ? (
															<LandinBox />
														) : (
															<div>
																<PayPalButtons
																	createOrder={createOrder}
																	onApprove={onApprove}
																	onError={onError}>

																</PayPalButtons>
															</div>
														)
														}
														{loadingPay && <LandinBox></LandinBox>}
													</ListGroup.Item>
												)}
											</ListGroup>
										</Card.Body>
									</Card>
								</Col>
							</Col>
						</Row> */}
						<div className='flex justify-center items-center '>
						<div className="w-full max-w-md  grid p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
							<div className="flex items-center justify-between mb-4">
								<img className="w-auto h-auto" src={pagos} alt="paypal" />
								<p href="#" className="text-sm font-medium flex items-center text-blue-900  dark:text-blue-500">
									Vista previa del pago
								</p>
							</div>
							<div className="flow-root">
								<ul  className="divide-y divide-gray-200 dark:divide-gray-700">
									<li className="py-3 sm:py-4">
										<div className="flex items-center justify-between space-x-4">
											<div className="flex min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate dark:text-black">
													Monto:
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
												S/. {order.itemsPrice.toFixed(2)}
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
										<div className="flex items-center justify-between space-x-4">
											<div className="flex min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate dark:text-black">
													Transporte:
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
											S/. {order.shippingPrice.toFixed(2)}
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
									<div className="flex items-center justify-between space-x-4">
											<div className="flex min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate dark:text-black">
													Impuesto:
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
											S/. {order.taxPrice.toFixed(2)}
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
									<div className="flex items-center justify-between space-x-4">
											<div c1lass="flex min-w-0">
												<h4 className="text-sm font-medium text-gray-900 truncate dark:text-black">
													<strong>Total a pagar: </strong>
												</h4>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
											<strong>S/. {order.totalPrice.toFixed(2)}</strong>
											</div>
										</div>
									</li>
									<li className="pt-3 pb-0 sm:pt-4">
									<div className="grid items-center  space-x-4">
											<div c1lass="grid min-w-0">
											{!order.isPaid && (
													<ListGroup.Item>
														{isPending ? (
															<LandinBox />
														) : (
															<div>
																<PayPalButtons
																	createOrder={createOrder}
																	onApprove={onApprove}
																	onError={onError}>

																</PayPalButtons>
															</div>
														)
														}
														{loadingPay && <LandinBox></LandinBox>}
													</ListGroup.Item>
												)}
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					</div>
				)
	)
}
