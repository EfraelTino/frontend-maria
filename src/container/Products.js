import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import logger from 'use-reducer-logger'
import LandingBox from '../components/LandingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'


const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETH_SUCCESS':
			return { ...state, products: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}
export default function Products() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
		products: [],
		loading: true,
		error: ''
	});
	// const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get('/api/products');
				dispatch({ type: 'FETH_SUCCESS', payload: result.data })
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message })
			}

			// setProducts(result.data);
		}
		fetchData();
	}, []);
  return (
    <div >
	<Helmet>
		<title>Productos | Mi primera puntada</title>
	</Helmet>
      {loading ? (<LandingBox />)
						:
						error ? (<MessageBox variant ='danger' >{error}</MessageBox>)
							:
							(
								<Row className='mt-2'>
                                    <h1 className='my-5 font-carrois font-extrabold '>Todos nuestros productos</h1>
									{products.map((product) => (
                                        
										<Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
										<Product product= {product} />
										</Col>
									))}
								</Row>
							)}
    </div>
  )
}
