import React, { useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Store } from '../Stores';
import '../styles/ProductList.scss';
import cart from '../assets/icons/cart.svg'
import { Badge } from 'react-bootstrap';

export default function Product({ product }) {

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems }
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <>
      {/* <div className='ProductInfo'>
      <Link to={`/product/${product.slug}`}>
        <img src={product.img} alt={product.img} className='ProductInfo__img' />
      </Link>
      <Card.Body className='ProductInfo__card'>
        <Rating rating={product.rating} numReviews={product.numReviews} className='ProductInfo__card__rating' />
        <div className='ProductInfo__card__body'>
        <section>
          <Link to={`/product/${product.slug}`}>
            <p className='ProductInfo__card__title'>{product.title}</p>
          </Link>
          <p className='ProductInfo__card__body'>
            <strong>S/.{product.price}{'.00'}</strong>
          </p>
          </section>
          <figure onClick={() => addToCartHandler(product)} key={product.id}>
            <img src={cart} alt='add-to-cart' />
          </figure>
        </div>
        {product.stock <= 0 ? <Button disabled variant='light'>Agotado</Button> : (
          <VerProduct onClick={() => addToCartHandler(product)} producto='Ver producto' />)}

      </Card.Body>
    </div>  */}
      <div className="bg-[#fcfaf5]">
        <div className="mx-auto container py-8">
          <div className="flex flex-wrap items-center lg:justify-between justify-center">
            <div className="mx-2 w-100 h-100 lg:mb-0 mb-8">
              <div>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.img} alt={product.title} className="w-full" />
                </Link>
              </div>
              <div className="bg-white">
                <div className="flex items-center justify-between px-2 py-2 ">
                  <div>
                    <Rating rating={product.rating} numReviews={product.numReviews} className='ProductInfo__card__rating' />
                  </div>
                  <div className="py-1.2 px-7 cursor-pointer ">
                    <figure onClick={() => addToCartHandler(product)} key={product.id}>
                    <Badge className='bg-black position-absolute rounded-circle font-semibold'>+</Badge>
                      <img src={cart} alt='add-to-cart' />
                    </figure>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center">
                    <Link to={`/product/${product.slug}`} className='no-underline'>
                      <h2 className="font-montserrat text-base font-medium  text-left text-black">{product.title}</h2>
                    </Link>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-montserrat">{product.description}</p>
                  <div className="flex mt-4">
                    <div>
                      <p className="text-xs text-gray-600 px-2 bg-[#bae6fd] py-1 font-montserrat"><strong>Talla: </strong>{product.talla}</p>
                    </div>
                    <div className="pl-2">
                      <p className="text-xs text-gray-600 px-2 bg-[#bae6fd] py-1 font-montserrat"><strong>Stock: </strong> {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <h2 className="text-xs font-semibold font-montserrat"><strong className='font-montserrat'>Caterogía:</strong> <span className='text-gray-600 font-montserrat'>{product.category}</span></h2>
                    <h4 className="text-indigo-500 text-black font-semibold font-montserrat">
                    S/. {product.price}{'.00'}</h4>
                    
                  </div>
                  {product.stock <= 0 ? <button disabled className='grid w-full group-hover:stroke-white bg-[#f0f9ff] px-7 py-2 text-gray-600 font-montserrat'>Agotado</button> : (
                      <button onClick={() => addToCartHandler(product)} className='group-hover:stroke-white bg-[#74D0D2] px-7 py-2 text-white hover:bg-sky-700 font-montserrat  text-lg'>Agregar al carrito</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
