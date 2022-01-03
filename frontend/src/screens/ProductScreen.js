import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Table, Modal} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { logout } from '../actions/userActions'


function ProductScreen() {

    // Main picture modal
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Variant picture modals
    const [showModalVariants, setShowModalVariants] = useState(
        new Array(15).fill(false)
    )
    const handleShowVariants = (position) => {
        const updatedArray = showModalVariants.map((el, index) => index === position ? true : false)
        setShowModalVariants(updatedArray)
    }
    const  handleCloseVariants = () => setShowModalVariants(new Array(15).fill(false))
 

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [checkedState, setCheckedState] = useState(
        new Array(15).fill(false)
    );

    
    const [checkedBoxIndex, setCheckedBoxIndex] = useState(null)
    

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? true : false);
        setCheckedState(updatedCheckedState);
        setCheckedBoxIndex(position)
    }


    const dispatch = useDispatch();
    
    const keyword = useSelector(state=>state.keyword)
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const productReviewCreate = useSelector(state => state.productReviewCreate)
    let { loading:loadingProductReview, error:errorProductReview, success:successProductReview } = productReviewCreate

    const productId = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        if (errorProductReview?.includes('token not valid')) {
            dispatch(logout())
        } 
        if(successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(productId.id))
    }, [dispatch, successProductReview, errorProductReview, productId.id])

    const addToCartHandler = (variantId) => {
   
        navigate(`/cart/${productId.id}?qty=${qty}&variant=${variantId}`)
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(productId.id, {rating, comment}))

    }



    return (
        <div className='hidden'>
            
            <Link to={keyword ? `/${keyword.keyword}` : '/'} className='btn btn-light my-3'>Go back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                    <div>
           
                        <Row>
                            <Col md={4}>
                                <Image onClick={handleShow} src={product.image} alt={product.name} fluid className='productImage'></Image>
                            </Col>

                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Body>
                                    <Image src={product.image} alt={product.name} fluid className='modalImage fullsize'>
                                    </Image>                                
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
        
                            <Col md={6}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
            {product.numVariants === 1 && (           
                            <Col md={5}>
                                <Card md={5} className='my-5'>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Price:
                                                    </Col>
                                                    <Col>
                                                        <strong>${product.variants[0].price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
            
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        { product.variants[0].countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.variants[0].countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {                           
                                                                    [...Array(product.variants[0].countInStock).keys()].map((x) => (
                                                                        <option key={x+1} value={x+1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Select>
                                                        
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
            
                                            <ListGroup.Item>
                                                <Button 
                                                    onClick={
                                                        ()=> (
                                                        addToCartHandler(product.variants[0]._id))
                                                    }
                                                    className='btn-block' 
                                                    disabled={product.variants[0].countInStock === 0} 
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
            
                                        </ListGroup>
                                    </Card>
                                </Card>
                            </Col>
            )} 

            {product.numVariants > 1 && (   
                <div> 
                                    <Table size='sm' hover className='my-5 margin'>
                                        <thead>
                                            <tr className='bold light'>
                                                <th>Image</th>
                                                <th>Description</th>
                                                <th>Price / each</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {product.variants.map((variant, index) => (
                                            <tr 
                                            onClick={()=> handleOnChange(index)} 
                                            className={checkedState[index] ? 'marked' : ''} 
                                            key={variant._id}
                                            >
                                                <td>
                                                    <Image onClick={()=> handleShowVariants(index)} className='thumbsize zindex' src={variant.image} alt={variant.name} thumbnail></Image>
                                                    <Modal show={showModalVariants[index]} onHide={handleCloseVariants}>
                                                        <Modal.Body>
                                                            <Image src={variant.image} alt={variant.description} fluid className='modalImage fullsize'>
                                                            </Image>                                
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleCloseVariants}>
                                                                Close
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                </td>
                                                <td>
                                                    {variant.description}
                                                    <br />
                                                    {variant.relatedProductLink && (
                                                         <Link to={`/product/${product._id}`} className='btn-sm small green'>Related product link</Link>
                                                    )}
                                                </td>
                                                <td className='smallscreenRow'>
                                                        {variant.price}
                                                </td>
                                             </tr>
            
                                           
                                            ))}
                                        </tbody>
                                    </Table>
{product.variants[checkedBoxIndex] && ( 
                                        <Card md={5} className='my-5 justify-content-center'>
                                            <Card>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                                Price / total:
                                                            </Col>
                                                            <Col>
                                                            {product.variants[checkedBoxIndex].price} x {qty} = ${product.variants[checkedBoxIndex].price* qty }
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                                Status:
                                                            </Col>
                                                            <Col>
                                                                { product.variants[checkedBoxIndex].countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                    { product.variants[checkedBoxIndex].countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                                Amount ready to ship:
                                                            </Col>
                                                            <Col>
                                                                {product.variants[checkedBoxIndex].countInStock}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                    )}
                                                    {product.variants[checkedBoxIndex].countInStock > 0 && (
                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Qty</Col>
                                                                <Col>
                                                                    <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                        {                           
                                                                            [...Array(product.variants[checkedBoxIndex].countInStock).keys()].map((x) => (
                                                                                <option key={x+1} value={x+1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            ))
                                                                        }

                                                                    </Form.Select>
                                                                
                                                                </Col>
                                                            </Row>
                                                            <Row className='center italic'>
                                         
                                                            </Row>
                                                        </ListGroup.Item>
                 
                                                
                                                    )}

                                                    <ListGroup.Item>
                                                        <Button 
                                                            onClick={()=>(addToCartHandler(product.variants[checkedBoxIndex]._id))}
                                                            className='btn-block' 
                                                            disabled={product.variants[checkedBoxIndex].countInStock <= 0 } 
                                                            type='button'>
                                                            Add to Cart
                                                        </Button>
                                                    </ListGroup.Item>

                                                </ListGroup>
                                            </Card>
                                        </Card>
                                        )}
                </div>         
            )} 

                        </Row>
                        <Row>
                            <Col md={6}>
                                <h4>Recent reviews</h4>
                                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825' />
                                            <div className='light flex'>
                                            <p style={{'marginRight': '1rem'}}>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h4>Write a review</h4>
                                        {loadingProductReview && <Loader />}

                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}

                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                        

                                        {userInfo ? (
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
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                    )




            }
        

        </div>
    )
}

export default ProductScreen
