import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Store } from '../Stores';


export default function ShipinngAdressScreen() {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const {
		userInfo,
		cart: { shippingAddress },
	} = state;
	const [fullName, setFullName] = useState(shippingAddress.fullName || '');
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
	const [country, setCountry] = useState(shippingAddress.country || '');
	const [telef, setTelef] = useState(shippingAddress.telef || '');

	useEffect(() => {
		if (!userInfo) {
			navigate('/signin?redirect=/shipping')
		}
	}, [userInfo, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				fullName,
				address,
				city,
				postalCode,
				country,
			},
		});
		localStorage.setItem(
			'shippingAddress',
			JSON.stringify({
				fullName,
				address,
				city,
				postalCode,
				country,
				telef
			})
		);
		navigate('/payment');
	}
	return (
		<>

			<Helmet>
				<title>Datos personales | Mary Helen</title>
			</Helmet>
			<CheckOutSteps step1 step2></CheckOutSteps>
			{/* <div>
				<div className='container small-container col-md-3'>
					<h1 className='my-3'>
						Rellenar datos personales
					</h1>
					<Form onSubmit={submitHandler}>
						<Form.Group className='mb-3' controlId='fullName'>
							<Form.Label>Apellidos y nombres</Form.Label>
							<Form.Control
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required />
						</Form.Group>
						<Form.Group className='mb-3' controlId='address' >
							<Form.Label>Dirección</Form.Label>
							<Form.Control
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='city' >
							<Form.Label>Ciudad</Form.Label>
							<Form.Control
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='postalCode' >
							<Form.Label>Código postal</Form.Label>
							<Form.Control
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='country' >
							<Form.Label>País</Form.Label>
							<Form.Control
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='telef' >
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								value={telef}
								onChange={(e) => setTelef(e.target.value)}
								required
							/>
						</Form.Group>
						<div className='mb-3'>
							<Button variant='warning' type='submit'>
								Continuar
							</Button>
						</div>
					</Form>
				</div>
			</div> */}
			<section className=" p-6 sm:p-20  dark:text-gray-50 w-full">
				<h1 className='my-3 text-black font-carrois font-bold tracking-tight leading-10'>
					Rellenar datos personales
				</h1>
				
				<form action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid " onSubmit={submitHandler}>
					<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md ">
						<div className="space-y-2 col-span-full lg:col-span-1">
							<p className="font-medium text-dark font-montserrat font-semibold">Información personal</p>
							<p className="text-xs text-dark font-montserrat ">Rellenar los datos de manera correcta para no tener ningún inconveniente</p>
							
						</div>
						<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
							<div className="col-span-full sm:col-span-3">
								<label controlid='fullName' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">Apellidos y nombres</label>
								<input id="fullName" type="text" placeholder="Introducir apellidos y nombres" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9 "
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									required
								/>
							</div>
							<div className="col-span-full sm:col-span-3">
								<label controlid='country' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">País</label>
								<input id="country" type="text" placeholder="Introducir país" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									required />
							</div>
							<div className="col-span-full">
								<label controlid='address' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">Dirección</label>
								<input id="address" type="text" placeholder="Introducir dirección" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									required
								/>
							</div>
							<div className="col-span-full sm:col-span-2">
								<label controlid='city' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">Ciudad</label>
								<input id="city" type="text" placeholder="Introducir ciudad" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									required
								/>
							</div>
							<div className="col-span-full sm:col-span-2">
								<label controlid='postalCode' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">Código postal</label>
								<input id="postalCode" type="text" placeholder="Introducir código postal" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9"
									value={postalCode}
									onChange={(e) => setPostalCode(e.target.value)}
									required
								/>
							</div>
							<div className="col-span-full sm:col-span-2">
								<label controlid='telef' className="text-sm text-black font-montserrat block font-montserrat tracking-wide text-gray-700 text-xs font-bold mb-2">Teléfono</label>
								<input id="telef" type="text" placeholder="Introducir teléfono" className="appearance-none w-full rounded-md focus:ring  focus:ring-opacity-75 bg-blue-50 focus:ring-violet-400 border-red-500 dark:text-gray-900 p-1  focus:bg-white font-montserrat leading-9" value={telef}
									onChange={(e) => setTelef(e.target.value)}
									required />
							</div>
							<div className='mb-3 flex text-center justify-end col-span-full leading-9 font-montserrat font-bold'>
								<button className='px-6 py-1 border-neutral-900 border-2  rounded-md bg-neutral-900 text-neutral-50  font-montserrat font-normal hover:bg-slate-50 hover:text-neutral-900  hover:border-neutral-900' type='submit'>
									Continuar
								</button>
							</div>
						</div>

					</fieldset>

				</form>
			</section>
		</>
	)
}
