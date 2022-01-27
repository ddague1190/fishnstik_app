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


const ProductScreen = ()  => {

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
            
            <Link to={keyword ? `/products/${keyword.keyword}` : '/'} className='productscreen__goback'>Go back</Link>
            {loading ?
        
                <Loader /> :

             error ? 

                <Message variant='danger'>{error}</Message> : ( 
                
                <div className='productscreen__details u-box-shadow'>
                    <ProductDetails product={product} height='15rem' />


                                
                    {product.numVariants === 1 && <AddToCartCard product={product} checkedBoxIndex={0}/> } 

                    {product.numVariants > 1 && ( 
                        <div className='varianttable'>  
                            <div className='varianttable__select u-center-text'>
                                {checkedBoxIndex === null ? 
                                    <h4 className='u-accent-color-pulsing'>please select an option...</h4>
                                   :
                                   <h3>options</h3> 
                                }
                                <select className='cartform__select u-center-text' onChange={(e)=>selectionFromVariantList(e.target.value)}>
                                    {checkedBoxIndex === null && <option >Select from list...</option>}
                                    {           
                                        product.variants.map((variant, index) => (
                                            <option                                         
                                                key={index} 
                                                value={index}
                                            >
                                                {variant.identifier}
                                            </option>
                                        ))
                                    }
                                </select>
                                <i class="fas fa-caret-down"></i>

                            </div>
                        <div className='varianttable__tables'>
                        {checkedBoxIndex !=null && (
                            <div className='varianttable__details'> 
                                <Figure 
                                    image={product.variants[checkedBoxIndex].image} 
                                    description={product.variants[checkedBoxIndex].description} 
                                    alt={product.variants[checkedBoxIndex].identifier} 
                                    height='20rem'
                                />

                                <h4>{product.variants[checkedBoxIndex].identifier}</h4>
                                <span className='u-font-style-italic'>{product.variants[checkedBoxIndex].description}</span>
                            </div>
                        ) 
                        }

                                {product.variants[checkedBoxIndex] && 
                                
                                    <AddToCartCard
                                        product={product} 
                                        checkedBoxIndex={checkedBoxIndex} 
                                    />                           
                                } 
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <div className='showreviews u-margin-top-huge'>
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


            <div className='createreview u-margin-top-small u-margin-bottom-medium '>
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
    )
}

export default ProductScreen;