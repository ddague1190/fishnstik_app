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

    console.log(products)
    console.log(url_cat, url_subcat)

    useEffect(() => {
        if(keyword) {
            dispatch(updateKeyword(keyword))
            dispatch(listProducts(keyword))
        }
        if(!keyword && url_cat) {
            dispatch(listCategorizedProducts(url_cat, url_subcat))
        }
    }, [url_cat, url_subcat])


    return (
        <div className='productlist'>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : 
            products &&  (   
                <div className='productlist__cards'>     
                    {products.length > 0 ? (
                        products.map((product, index) => {
                        return (
                            <Product key={product._id} product={product} keyword={keyword}/>
                        );
                        })
                    ) : (<h2>No products found</h2>)
                    }
                </div>
            )
            }
            
            <Paginate 
                page={page} 
                pages={pages} 
            />

        </div>
    )
}

export default ProductList
