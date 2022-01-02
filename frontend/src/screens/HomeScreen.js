import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useLocation } from 'react-router-dom'
import { updateKeyword } from '../actions/routeAction'



function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    // const [searchParams, setSearchParams] = useSearchParams();
    // const keyword = searchParams.get('keyword')

    let location = useLocation();
    let keyword = location.search


    // const [prevKeyword, setPrevKeyword] = useState(keyword)

    useEffect(() => {
        dispatch(updateKeyword(keyword))
        dispatch(listProducts(keyword))
       

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :     
                <div>     
                    <Row className='flex'>
                        {products.map(product => (
                            <Col key={product._id} className='gap2' >
                                <Product product={product} keyword={keyword} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword}/>
                </div>
            }
  
        </div>
    )
}

export default HomeScreen
