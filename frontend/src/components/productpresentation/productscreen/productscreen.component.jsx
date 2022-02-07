import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../utilities/rating/rating.component';
import Loader from '../../utilities/loader/loader.component';
import Message from '../../utilities/message/message.component';
import ProductDetails from '../productdetails/productdetails.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../../redux/actions/productActions';
import AddToCartCard from '../../utilities/addtocartcard/addtocartcard.component';
import WriteReview from '../../utilities/writereview/writereview.component';
import './productscreen.styles.scss';
import Recommended from '../../promotional/recommended/recommended.component';
import Variants from '../variants/variants.component';
import MobileVariants from '../variants/mobilevariants.component';
import MinimizedVariants from '../variants/minimizedvariants.component';
import PreCartItem from '../../checkoutpathway/cartitem/pre-cartitem.component';


const ProductScreen = ()  => {
    
    const [whichContent, setWhichContent] = useState('overview');
    const [writeReview, setWriteReview] = useState(false);

    const dispatch = useDispatch();


    const keyword = useSelector(state=>state.keyword);

    const {loading, error, product } = useSelector(state => state.productDetails);

    const { userInfo } = useSelector(state => state.userLogin);

    const productId = useParams();

    useEffect(() => {
        dispatch(listProductDetails(productId.id))
    }, [dispatch, productId.id])

    return (
        <div className='productscreen'>
            <div className='path-group'>
                <Link to='/'>Home</Link> 
                <span> > </span>
                <Link to={`/products/${product.category}/`}>{product.category}</Link>
                <span> > </span>
                <Link to={`/products/${product.category}/${product.subcategory}/`}>{product.subcategory}</Link>
            </div>




            <div className='productscreen__content'>
                <ul className='tab-group'>
                    <li className={`tab-group__tab ${whichContent==='overview' && 'tab-group__tab--active'}`} onClick={()=>setWhichContent('overview')}>
                        <span>Overview</span>    
                    </li>
    
                    <li className={`tab-group__tab ${whichContent==='photos' && 'tab-group__tab--active'}`} onClick={()=>setWhichContent('photos')}>
                        <span>#fishnstik</span>    
                    </li>
                    <li className={`tab-group__tab ${whichContent==='reviews' && 'tab-group__tab--active'}`} onClick={()=>setWhichContent('reviews')}>
                        <span>Reviews</span>    
                    </li>
                </ul>
        {
            {
            'overview':
            <div className='productscreen__details'>

            {loading ?
        
                <Loader /> :

             error ? 

                <Message variant='danger'>{error}</Message> : ( 
                    <>
                        <ProductDetails product={product} height='8rem' />
                    </>
            )}
            </div>,

            'reviews':
            <div className='productscreen__reviews'>

            {!writeReview ? (
            <div className='showreviews'>
                <h3 className='u-center-text'>Recent reviews</h3>  
                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                <div className='reviewcards'>
                    {product.reviews.map((review) => (
                        <div className='reviewcard' key={review._id}>
                            <p className='reviewcard__comment'>{review.comment}</p>
                            <strong className='reviewcard__name'>{review.name}</strong>
                            <Rating value={review.rating} color='#f8e825' />
                            <p className='reviewcard__date'>{review.createdAt.substring(0,10)}</p>
                        </div>    
                    ))}
                </div>
                <span onClick={()=>setWriteReview(true)} className='showreviews__writebutton'>Write a review!</span>

            </div>
            
            ) : (

            <div className='createreview'>
                <h3>Write a review</h3>
            
            {userInfo ? 
                <WriteReview setWriteReview={setWriteReview} /> : (
                <>
                <br/>
                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                </>
                )
            }
            </div>
            
            )}   
            </div>

        }[whichContent]
        }
            </div>

        {product.numVariants === 1 && <AddToCartCard product={product} checkedBoxIndex={0}/> } 

    
        <Recommended className='productscreen__recommended' />

        <div className='productscreen__variants'>
            <div className='productscreen__variants-title'>
                <h2>Options to choose from</h2>
            </div>
            

            {product.variants.map((variant, index) => {
                
                return <PreCartItem product={product} variant={variant} key={index} />
                
                })}

        </div>

        </div>
    )
}

export default ProductScreen;