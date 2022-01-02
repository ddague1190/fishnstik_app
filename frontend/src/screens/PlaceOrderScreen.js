import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'



function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    let {order, error, success} = orderCreate
    const [instructions, setInstructions] = useState('')
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const cart = useSelector(state => state.cart)


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

    cart.shippingPrice = (cart.itemsPrice > 100 ?  0 : 10).toFixed(2);

    cart.taxPrice = ((0.082) * cart.itemsPrice).toFixed(2);

    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.taxPrice) +
        Number(cart.shippingPrice)
    ).toFixed(2);
    
    useEffect(() => { 

        if(cart.cartItems.length === 0) {
            navigate('/')
        }
        if(!cart.shippingAddress.name) {
            navigate('/shipping/')
        }
        if(!cart.paymentMethod) {
            navigate('/payment');
        }
        if(success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }

        if (error?.includes('token not valid')) {
            
            dispatch(logout())
            navigate('/login/')
        } 

    }, [error, success, dispatch, navigate, cart])


    const placeOrder = () => {
        
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            instructions: instructions
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>

         
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <ul className='list'>
                                <li className='light my-2'>Shipping Address:</li>
                                <li>{cart.shippingAddress.name}</li>  
                                <li>{cart.shippingAddress.address}</li>
                                {cart.shippingAddress.apartment ? <li>Apt/Ste: {cart.shippingAddress.apartment}</li> : ''} 
                                <li>{cart.shippingAddress.city}, {cart.shippingAddress.state} {cart.shippingAddress.postalCode}</li>
                                <li>{cart.shippingAddress.phone}</li>
                            </ul>
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4 className='green'>Instructions</h4>
                            <Form.Control
                                type='text'
                                placeholder='Any special instructions for this order?'
                                value={instructions ? instructions : ''}
                                onChange={(e)=>setInstructions(e.target.value)}
                            >
                            </Form.Control>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? 
                            <Message variant='info'>Your cart is empty</Message> :
                            (   
                                <ListGroup variant='flush'>

                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image className='thumbsize'src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>

                                                <Col >
                                                <Link 
                                                className="product-links" 
                                                to={`/product/${item.productId}`}
                                                >
                                                    <strong className='bold'>{item.name}</strong> <p className='light'>({item.variantDescription})</p>
                                                </Link>


                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    )) 
                                    }

                                </ListGroup>

                            )
                            }
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
 
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button'
                                    className='btn-block'
                                    disable={cart.cartItems.length === 0 ? true : undefined}
                                    onClick={placeOrder}
                                >
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default PlaceOrderScreen
