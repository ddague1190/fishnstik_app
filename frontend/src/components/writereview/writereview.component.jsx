import React, {useState, useEffect} from 'react';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { createProductReview } from '../../actions/productActions';
import { Button, Form } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { useParams } from 'react-router-dom';




const WriteReview = () => {

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
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        }

    }, [dispatch, successProductReview, errorProductReview]);


    return(
        <div>
        {loadingProductReview && <Loader />}
        {successProductReview && <Message variant='success'>Review Submitted</Message>}
        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
    
    
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control 
                    as='select'
                    value={rating}
                    onChange={(e)=> setRating(e.target.value)}
                >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                </Form.Control>
            </Form.Group>
                                        
            <Form.Group controlId='comment'>
                <Form.Label>Review</Form.Label>
                <Form.Control
                    as='textarea'
                    rows='5'
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button
                disabled={loadingProductReview}
                type='submit'
                variant='primary'
            >
                Submit
            </Button>
        </Form> 
    </div>
    )
};

export default WriteReview;
        
