import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../components/rating/rating.component';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import ProductDetails from '../../components/productdetails/productdetails.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import VariantCards from '../../components/varianttable/varianttable.component';
import AddToCartCard from '../../components/addtocartcard/addtocartcard.component';
import WriteReview from '../../components/writereview/writereview.component';
import './productscreen.styles.scss';


const ProductScreen = ()  => {

    const [checkedState, setCheckedState] = useState(
        new Array(15).fill(false)
    );
    const [checkedBoxIndex, setCheckedBoxIndex] = useState(null);

    const selectionVariantTable = (position) => {
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
            
            <Link to={keyword ? `/products/${keyword.keyword}` : '/'} className='productscreen__goback'>Go back</Link>
            {loading ?
        
                <Loader /> :

             error ? 

                <Message variant='danger'>{error}</Message> : ( 
                
                <div className='productscreen__details'>
                    <ProductDetails product={product} height='13rem' />
                                
                    {product.numVariants === 1 && <AddToCartCard product={product} checkedBoxIndex={0}/> } 

                    {product.numVariants > 1 && ( 
                        <div className='productscreen__tables'>  
                            <VariantCards
                                product={product} 
                                selectionVariantTable={selectionVariantTable} 
                                checkedState={checkedState} 
                            />
                        
                            {product.variants[checkedBoxIndex] && ( 

                                <AddToCartCard
                                    product={product} 
                                    checkedBoxIndex={checkedBoxIndex} 
                                />                           
                            )} 
                        </div>
                    )}
                </div>
            )}
            
            <div className='showreviews u-margin-top-medium'>
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


            <div className='createreview u-margin-top-medium'>
                <h3>Write a review</h3>
            
            {userInfo ? 
                <WriteReview /> : (
                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                )
            }
            </div>
        
        </div>
    )
}

export default ProductScreen;