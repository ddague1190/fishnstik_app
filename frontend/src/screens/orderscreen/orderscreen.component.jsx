import React, {useState, useEffect} from 'react'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/message.component'
import Loader from '../../components/loader/loader.component'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder} from '../../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../../constants/orderConstants'



function OrderScreen() {

    const orderId = useParams().id;
    let navigate = useNavigate()
    
    const dispatch = useDispatch();
    const [errorPayPal, setErrorPayPal] = useState('')

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    let { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`
        script.async = true
        script.onload = () => { 
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    
    useEffect(() => { 
        if(!order || successPay || order._id !== Number(orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        
        if(error?.includes('token')) {
            navigate(`/login?redirect=/order/${orderId}`)
        }

    
    }, [dispatch, order, orderId, error, successPay, navigate])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ?  <Loader /> : 
    error ? <Message variant='danger'>{error}</Message> :
    (
        <div>
            <h1>Order: </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Contact info</h2>
                            <span><strong>Email:</strong>{order?.user.email}</span>
                            <br/>
                            <span><strong>Phone</strong> { order?.shippingAddress.phone}</span>
                            <br/>
                            <br/>
                            <p><strong>Shipping address for this order:</strong></p>
                            <ul className='list'>
                                <li>{ order?.shippingAddress.name}</li>
                                <li>{order?.shippingAddress.address}</li>
                                {order?.shippingAddress.apartment ? <li>{order?.shippingAddress.apartment}</li> : ''} 
                                <li>{order?.shippingAddress.city}, {order?.shippingAddress.state} {order?.shippingAddress.postalCode}</li>
                            </ul>

                            {order?.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : order.trackingNumber ? (
                                <Message variant='info'>{order.shippingService} {order.trackingNumber}</Message>
                            ) :
                            <Message variant='warning'>Not shipped</Message> 
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong> Payment method: </strong>
                                {order.paymentMethod}
                            </p>
                            <p>
                                <strong> Instructions: </strong>
                                {order.instructions ? order.instructions : 'None given'}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not paid{order.paidAt}</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order?.orderItems.length === 0 ? 
                            <Message variant='info'>Order is empty</Message> :
                            (   
                                <ListGroup variant='flush'>

                                    {order?.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                           
                                                <Col >
                                                    <Link to={`/product/${item.product}`}>{item.name} ({item.variantDescription})</Link>
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {errorPay && <Message variant='danger'>{errorPay}</Message>}
                                    {errorPayPal && <Message variant='danger'>{errorPayPal}</Message>}


                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton 
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                    currency_code: "USD",
                                                    value: order.totalPrice
                                                    },
                                                    custom_id: orderId,
                                                    shipping: {
                                                        name: {
                                                          full_name: order.shippingAddress.name
                                                        },
                                                        address: {
                                                          address_line_1: order.shippingAddress.address,
                                                          address_line_2: order.shippingAddress.apartment,
                                                          admin_area_2: order.shippingAddress.city,
                                                          admin_area_1: order.shippingAddress.state,
                                                          postal_code: order.shippingAddress.postalCode,
                                                          country_code: 'US',
                                                        }
                                                      }
                                                   
                                                }],
                                                application_context: {
                                                    locale: 'us-US',
                                                    shipping_preference: 'SET_PROVIDED_ADDRESS',
                                                  }
                                            
                                                });
                                            }}
                                            onSuccess={successPaymentHandler}
                                            onError={(err)=>setErrorPayPal(err)}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default OrderScreen
