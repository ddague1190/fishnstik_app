import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../components/rating/rating.component';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import ProductDetails from '../../components/productdetails/productdetails.component';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import VariantTable from '../../components/varianttable/varianttable.component';
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
            
            <Link to={keyword ? `/products/${keyword.keyword}` : '/asfd'} className='btn btn-light my-3'>Go back</Link>
            {loading ?
        
                <Loader /> :

             error ? 

                <Message variant='danger'>{error}</Message> : ( 
                
                <div className='productscreen__details'>
                    <ProductDetails product={product} height='200px' />
                    
                                
                    {product.numVariants === 1 && <AddToCartCard product={product} /> } 

                    {product.numVariants > 1 && ( 
                        <div>  
                            <VariantTable 
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
            
            <div className='productscreen__showreviews'>
                <h4>Recent reviews</h4>  
                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                {product.reviews.map((review) => (
                    <div key={review._id}>
                        <p>{review.comment}</p>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e825' />
                        <p style={{'marginRight': '1rem'}}>{review.createdAt.substring(0,10)}</p>
                    </div>    
                ))}
            </div>


            <div className='productscreen__createreview'>
                <h4>Write a review</h4>
            
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