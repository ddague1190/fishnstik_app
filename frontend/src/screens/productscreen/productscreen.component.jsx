import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../components/rating/rating.component';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import ProductDetails from '../../components/productdetails/productdetails.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import AddToCartCard from '../../components/addtocartcard/addtocartcard.component';
import WriteReview from '../../components/writereview/writereview.component';
import './productscreen.styles.scss';
import Figure from '../../components/figure/figure.component';
import Recommended from '../../components/recommended/recommended.component';
import Variants from '../../components/variants/variants.component';


const ProductScreen = ()  => {

    const [whichContent, setWhichContent] = useState('overview');

    const [checkedState, setCheckedState] = useState(
        new Array(15).fill(false)
    );
    const [checkedBoxIndex, setCheckedBoxIndex] = useState(null);

    const selectionFromVariantList = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? true : false);
        setCheckedState(updatedCheckedState);
        setCheckedBoxIndex(position);
    }

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
            <div className='productscreen-details'>

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
            <div className='productscreen-reviews'>
            <div className='showreviews'>
                <h3>Recent reviews</h3>  
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

            </div>


            <div className='createreview'>
                <h3>Write a review</h3>
            
            {userInfo ? 
                <WriteReview /> : (
                <>
                <br/>
                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                </>
                )
            }
            </div>
            </div>

        }[whichContent]
        }
            </div>

        {product.numVariants === 1 && <AddToCartCard product={product} checkedBoxIndex={0}/> } 

    
        <Recommended className='productscreen__recommended' />

        
        <Variants product={product} className='productscreen__variants' />


        </div>
    )
}

export default ProductScreen;