import React, {useState, useEffect} from 'react';
import Loader from '../loader/loader.component';
import Message from '../message/message.component';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../redux/constants/productConstants';
import { createProductReview } from '../../../redux/actions/productActions';
import { logout } from '../../../redux/actions/userActions';
import { useParams } from 'react-router-dom';
import './writereview.styles.scss';




const WriteReview = ({setWriteReview}) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const productReviewCreate = useSelector(state => state.productReviewCreate);
    let { loading:loadingProductReview, error:errorProductReview, success:successProductReview } = productReviewCreate;
    const productId = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId.id, {rating, comment}));
    }
    
    useEffect(() => {
        if (errorProductReview?.includes('token not valid')) {
            dispatch(logout());
        } 
        if(successProductReview) {
            setRating(0);
            setComment('');
            setWriteReview(false);
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        }
        return(()=>setWriteReview(false))

    }, [dispatch, successProductReview, errorProductReview]);


    return(
        <>
        {loadingProductReview && <Loader />}
        {successProductReview && <Message variant='success'>Review Submitted</Message>}
        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
    
            <form className='writereview' onSubmit={submitHandler}>
                    <span className='u-font-weight-light'>Select a rating</span>
                    <select 
                        className='cartform__select' 
                        value={rating} onChange={(e)=> setRating(e.target.value)}
                    >
                        <option value=''>Select Rating...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                    </select>
                    <span className='u-font-weight-light'>Add a comment</span>
                    <textarea
                    className='writereview__textarea'
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    />    
                    <button
                        disabled={loadingProductReview}
                        type='submit'
                        className='btn--main'
                    >
                        Submit
                    </button>
            </form> 
        </>
    )
};

export default WriteReview;
        
