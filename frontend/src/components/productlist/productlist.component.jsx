import React, { useEffect } from 'react';
import Product from '../../components/product/product.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listCategorizedProducts } from '../../actions/productActions';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import Paginate from '../../components/paginate/paginate.component';
import { useLocation, useParams } from 'react-router-dom';
import { updateKeyword } from '../../actions/routeAction';
import './productlist.styles.scss';


const ProductList = ({target, ...otherProps}) => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let location = useLocation();
    let keyword = target ? target : location.search;
    let { url_cat, url_subcat } = useParams();


    useEffect(() => {
        if(keyword) {
            dispatch(updateKeyword(keyword))
            dispatch(listProducts(keyword))
        }
        if(!keyword && url_cat) {
            dispatch(listCategorizedProducts(url_cat, url_subcat))
        }
    }, [dispatch, keyword, url_cat, url_subcat])


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
                        })
                    }
                </div>
            }
            
            <Paginate 
                page={page} 
                pages={pages} 
            />

        </div>
    )
}

export default ProductList
