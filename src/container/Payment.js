import React, { useEffect, useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Store } from '../Stores';
import btnPaypal from '../assets/img/paypal.jpg';
import btnStripe from '../assets/img/stripe.jpg';
import { Form } from 'react-bootstrap';


export default function Payment() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store)

  const {
    cart: { shippingAddress, paymentMethod }
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal' || 'Tarjeta'
  )

  useEffect(() => {
    if (!shippingAddress.address)
      navigate('/shipping');
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder')
  }

  return (
    <div>
      <CheckOutSteps step1 step2 step3>Pagos</CheckOutSteps>
      <div className='container items-center flex flex-col h-100 py-12'>
        <Helmet>
          <title>Métodos de pago | Mi primera puntada</title>
        </Helmet>
        <h1 className='mt-3 font-carrois'>
          Elegir método de pago
        </h1>
          {/* <Form onSubmit={submitHandler}>
            <div className='mb-3 grid grid-cols-2 gap-4 py-3'>
              <Form.Check
                className='grid justify-items-center items-center'
                type='radio'
                id='PayPal'
                value='PayPal'
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img alt='paypal' src="" />
            </div>
            <div className='mb-3 grid grid-cols-2 gap-4 p-3'>
              <Form.Check
                className='grid justify-items-center items-center'
                type='radio'
                value='Stripe'
                checked={paymentMethodName === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img alt='stripe' src="" />
            </div>
            <div className='mb-3'>
              <button className='px-6 py-2 border-neutral-900 border-2  rounded-md bg-neutral-900 text-neutral-50  font-montserrat font-normal hover:bg-slate-50 hover:text-neutral-900  hover:border-neutral-900' type='submit'>
                Continuar
              </button>
            </div>
          </Form> */}
      </div>
      <form className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 p-12 ' onSubmit={submitHandler}>
        <div className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-xl">
          <div>
            <img
              src={btnPaypal}
              alt="Paypal"
              className="w-full object-cover"
            />
            <Form.Check className="bg-gray-900 mx-4 rounded-lg grid items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6" type="hidden" value='PayPal'
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)} />
          </div>
          <div className="px-6 py-4 flex flex-col gap-2">
            <button className='px-6 py-2 border-neutral-900 border-2   rounded-md bg-neutral-900 text-neutral-50  font-montserrat font-normal hover:bg-slate-50 hover:text-neutral-900  hover:border-neutral-900' type='submit'>
              Continuar
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-col max-w-sm mx-auto rounded-lg shadow-xl">
          <div>
            <img
              src={btnStripe}
              alt="Stripe"
              className="w-full object-cover"
            />
            <Form.Check className="bg-gray-900 mx-4 rounded-lg grid items-center gap-2 -mt-8 z-10 shadow-xl py-2 px-6" type="hidden" value='Stripe'
                checked={paymentMethodName === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
          />
          </div>
          
          <div className="px-6 py-4 flex flex-col gap-2">
            <button className='px-6 py-2 border-neutral-900 border-2   rounded-md bg-neutral-900 text-neutral-50  font-montserrat font-normal hover:bg-slate-50 hover:text-neutral-900  hover:border-neutral-900' type='submit'>
              Continuar
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}
