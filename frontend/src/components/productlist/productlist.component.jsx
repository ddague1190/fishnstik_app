import React, { useEffect } from 'react';
import Product from '../../components/product/product.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import Paginate from '../../components/paginate/paginate.component';
import { useLocation } from 'react-router-dom';
import { updateKeyword } from '../../actions/routeAction';
import './productlist.styles.scss';


const ProductList = ({target, ...otherProps}) => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let location = useLocation();
    let keyword = target ? target : location.search;


    useEffect(() => {
        dispatch(updateKeyword(keyword))
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div className='productlist'>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :     
                <div className='productlist__cards'>     
                    {products.map((product, index) => {
                        return (
                            <Product key={product._id} product={product} keyword={keyword}/>
                        );
                    }
                    )}
                </div>
            }
            
            <Paginate className='productlist__paginator' page={page} pages={pages} keyword={keyword}/>

        </div>
    )
}

export default ProductList
