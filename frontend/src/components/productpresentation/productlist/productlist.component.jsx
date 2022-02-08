import React, { useEffect } from 'react';
import Product from '../product/product.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listCategorizedProducts, listProductsByBrand } from '../../../redux/actions/productActions';
import Loader from '../../utilities/loader/loader.component';
import Message from '../../utilities/message/message.component';
import Paginate from '../../utilities/paginate/paginate.component';
import { useLocation, useParams } from 'react-router-dom';
import './productlist.styles.scss';
import SubcategoryList from '../subcategorylist/subcategorylist.component';
import SubcategoryInfo from '../subcategorylist/subcategoryinfo.component';
import BrandInfo from '../brandinfo/brandinfo.component';

const ProductList = ({target, ...otherProps}) => {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {error, loading, products, page, pages} = productList;

    let {search} = useLocation();
    let { url_cat, url_subcat, url_brand } = useParams();
    useEffect(() => {
        if(!url_cat &&!url_brand && search) {
            dispatch(listProducts(search))
        }
        else if(url_cat) {
            dispatch(listCategorizedProducts(url_cat, url_subcat, search))
        }
        else if(url_brand) {
            dispatch(listProductsByBrand(url_brand, search))
        }
    }, [search, url_cat, url_subcat, url_brand]);


    return (
        <div className='productlist'>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : 
            products &&  (   
                <>
                
                {url_brand && <BrandInfo brand={url_brand}/>}

                {(url_cat && !url_subcat) && <SubcategoryList category={url_cat}/>}
                
                {url_subcat && <SubcategoryInfo category={url_cat} subcategory={url_subcat}/>}
                <div className='productlist__cards'>     
                    {products.length > 0 ? (
                        products.map((product, index) => {
                        return (
                            <Product key={product._id} product={product}/>
                        );
                        })
                    ) : (<h3>No products found</h3>)
                    }
                </div>
                </> 
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
