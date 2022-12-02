import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Stores';
import { toast } from 'react-toastify'
import { getError } from '../util'
import principal from '../assets/icons/principal.svg';
export default function SignupScreen() {
	const navigate = useNavigate();

	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redirect');
	const redirect = redirectInUrl ? redirectInUrl : '/';

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	//comprar
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { userInfo } = state;
	//signin
	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast('Las contraseñas no coinciden, intente de nuevo');
			return;
		}
		try {
			const { data } = await Axios.post('/api/users/signup', {
				name,
				email,
				password,
			});
			ctxDispatch({ type: 'USER_SIGNIN', payload: data })
			localStorage.setItem('userInfo', JSON.stringify(data));
			navigate(redirect || '/');
		} catch (error) {
			toast(getError(error))
		}
	};
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);
	return (
		<>
			<Helmet>
				<title>Crear cuenta | Mi primera puntada</title>
			</Helmet>
			<div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-14">
				<div className="max-w-lg mt-5">
					<div className="bg-white w-full rounded-lg p-8 mb-8">
					<div className="flex justify-center mb-8 bg-white px-0 py-2 rounded">
                         <img src={principal}  alt='logo'/> 
                    </div>
						<div className="flex flex-col items-center gap-1 mb-8">
							<h1 className="text-xl text-gray-900">Crear cuenta</h1>
							<p className="text-gray-400 text-sm">
								Crea tu cuenta dentro de la plataforma y disfruta
							</p>
						</div>
						<form className="flex flex-col gap-4" onSubmit={submitHandler}>
							<div className="relative">
								<input
									type="text"
									className="w-full border py-2 px-10 rounded-md outline-none"
									placeholder="Ingresa tu nombre"
									required onChange={(e) => setName(e.target.value)}
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
									/>
								</svg>
							</div>
							<div className="relative">
								<input
									type="email"
									className="w-full border py-2 px-10 rounded-md outline-none"
									placeholder="Ingresa tu correo"
									required onChange={(e) => setEmail(e.target.value)}
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
							</div>
							<div className="relative">
								<input
									type="password"
									className="w-full border py-2 px-10 rounded-md outline-none"
									placeholder="Ingresa tu contraseña"
									required onChange={(e) => setPassword(e.target.value)}
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							</div>
							<div className="relative">
								<input
									type="password"
									className="w-full border py-2 px-10 rounded-md outline-none"
									placeholder="Confirmar contraseña"
									required onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							</div>
							<div>
								<button
									type="submit"
									className="w-full bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
								>
									Crear cuenta
								</button>
							</div>
						</form>
					</div>
					{/* <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border p-2 px-4 rounded-full"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                width="20"
                                height="20"
                                alt='google'
                            />
                            <span className="ml-2">Ingresar con Google</span>
                        </button> */}
					<span className="flex items-center justify-center gap-2">
					¿Ya tienes una cuenta? {' '}
							<Link to={`/signin?redirect=${redirect}`} className='text-decoration-none'>Inicia sesión</Link>
					</span>
				</div>
			</div>
		</>
	)
}
