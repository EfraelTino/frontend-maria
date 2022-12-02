import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import LandingBox from '../components/LandingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../util';
import { Store } from '../Stores';
import '../styles/ProductScreen.scss'
import '../styles/VerProducto.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: ''
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  }
  return (

    loading ? (<LandingBox />)
      :
      error ? (<MessageBox variant='danger' >{error}</MessageBox>)
        : (
          <>
            <div>
            <Helmet>
              <title>{product.title}</title>
            </Helmet>
              <div className="md:flex  items-start justify-center py-12 2xl:px-20 md:px-6 px-4 mt-5">
                <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                  <img className="w-full" src={product.img}
                    alt={product.slug} />
                </div>
                <div className="md:hidden">
                  <img className="w-full" src={product.img}
                    alt={product.slug} />
                  <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">

                    <img className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" alt="img-tag-one" />
                    <img className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png"  alt="img-tag-one" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                    <img  className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" alt="img-tag-one" />
                </div>
                </div>
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                  <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-black font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2 font-carrois">Detalles del producto</h3>
                    <h3 className="leading-none text-black dark:text-gray- font-normal tracking-tight font-montserrat text-xl"> {product.description}</h3>
                    
                  </div>
                  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-black dark:text-gray-300 font-montserrat">Categoría</p>
                    <div className="flex items-center justify-center">
                      <p className="text-sm leading-none text-black dark:text-gray-300 font-montserrat"><strong>{product.category}</strong></p>
                    </div>
                  </div>
                  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-black dark:text-gray-300 font-montserrat">Talla</p>
                    <div className="flex items-center justify-center">
                      <p className="text-sm leading-none text-black dark:text-gray-300 mr-3 font-montserrat"><strong>{product.talla}</strong></p>
                    </div>
                  </div>
                  <div className="
                  dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white  w-full py-4  ">
                    <section className='ProdctContainer__first__container__model__price text-black'>
                      <div> <strong className='font-montserrat font-semibold'>S/. {' '} {product.price}</strong></div>
                      <div className='ProdctContainer__first__container__model__price__estado'>{product.stock > 0
                        ? <span className='px-5 py-2 ProdctContainer__first__container__model__price__estado__disp font-montserrat font-light'><strong>Disponible</strong></span>
                        : <span className='px-5 py-2 ProdctContainer__first__container__model__price__estado__agotado font-montserrat font-light'><strong>Agotado</strong></span>}</div>
                    </section>
                  </div>
                  <div>
                    <div className="border-t border-b py-4 mt-7 border-gray-200">
                    <div className='ProdctContainer__first__container__carrito'>
                          {
                            product.stock > 0 && (
                              <ListGroup.Item>
                                <div className='d-grid ContainerVerMas'>
                                  <button onClick={addToCartHandler} className='ContainerVerMas__button  font-montserrat  font-normal text-xl '>
                                    Agregar al carrito
                                  </button>
                                </div>
                              </ListGroup.Item>
                            )
                          }
                          {/* <h1>PRODUCTOS RELACIONADOS</h1> */}
                          {/* <ProductList /> */}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>)
  )
}
