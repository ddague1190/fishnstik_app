import React, {useEffect} from 'react'
import { Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../../components/message/message.component'
import { addToCart, removeFromCart } from '../../actions/cartActions'


//removed {location}
function CartScreen() {
    const productId = useParams().id
    let navigate = useNavigate()
    let qty = parseInt(useLocation().search.split('=')[1])
    if(!qty) qty = 1

    const [searchParams, setSearchParams] = useSearchParams();
    const variantId = Number(searchParams.get('variant'))

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    // console.log({cartItems}) 

    //useDispatch to dispatch action - only in event of productId
    useEffect(() => { 
        if(productId) {
            dispatch(addToCart(productId, variantId, qty))
        }
    }, [dispatch, productId, variantId, qty])

    const removeFromCartHandler = (productId, variantId) => {
        dispatch(removeFromCart(productId, variantId))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
       <Row>
           <Col md={12}>
               <h1>Shopping Cart</h1>
               {cartItems.length === 0 ? (
                   <Message variant='info'>
                       Your cart is empty <Link to='/'>Go Back</Link>
                   </Message>
               ) : (
                   <ListGroup variant='flush'>
                       {cartItems.map(item => (
                           <ListGroup.Item key={`p${item.productId}v${item.variantId}`} className='border-top border-bottom' >
                               <Row>
                                   <Col>
                                        <Image src={item.image} alt={item.name} fluid rounded className='thumbsize'></Image>
                                   </Col>
                                   <Col md={4}>
                                       <Link 
                                            className="product-links" 
                                            to={`/product/${item.productId}`}
                                        >
                                            <strong className='bold'>{item.name}</strong> <p className='light'>({item.variantDescription})</p>
                                        </Link>
                                       
                                   </Col>
                                   <Col md={1}>
                                        ${item.price} <p className='light'>(each)</p>
                                   </Col>
                                   <div className='flex gap'>
                                   <Col md={4}> 
                                        <Form.Select
                                            value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.productId, item.variantId, Number(e.target.value)))}>
                                            
                                            {                           
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                   </Col>
                                   <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.productId, item.variantId)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button> 
                                   </Col>
                                   </div>
                               </Row>
                           </ListGroup.Item>
                       ))}
                   </ListGroup>
               )}
           </Col>
           <Col md={6}>
               <Card className='my-5'>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>
                               Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                           ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Button
                                type='button'
                                className='bnt-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                           >
                               Proceed to Checkout
                           </Button>
                       </ListGroup.Item>
                   </ListGroup>
           
               </Card>
           </Col>
       </Row>
    )
}

export default CartScreen
