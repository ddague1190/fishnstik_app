import React, {useEffect} from 'react';
import { Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../../components/message/message.component';
import { addToCart } from '../../actions/cartActions';
import CartItem from '../../components/cartitem/cartitem.component';
import './cartscreen.styles.scss'

const CartScreen = () => {
    const productId = useParams().id;
    let navigate = useNavigate();
    let qty = parseInt(useLocation().search.split('=')[1]);
    if(!qty) qty = 1;

    const [searchParams, setSearchParams] = useSearchParams();
    const variantId = Number(searchParams.get('variant'));

    const dispatch = useDispatch() 

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => { 
        if(productId) {
            dispatch(addToCart(productId, variantId, qty));
        }
    }, [dispatch, productId, variantId]);

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <div className='cartscreen u-margin-top-medium'>
            <h1 className='u-center-text'>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                   <Message variant='info'>
                       Your cart is empty <Link to='/'>Go Back</Link>
                   </Message>
               ) : (

                   <div className='cartitems'>
                        <span className='cartitems__header cartitems__header--image'>Image</span>
                        <span className='cartitems__header cartitems__header--product'>Product</span>
                        <span className='cartitems__header cartitems__header--changeqty'>Qty</span>

                        {cartItems.map((item, index) => (
                            <CartItem key={index} item={item} />
                            
                        ))}
                    </div>
                )}
            <div className='cartitems__subtotal u-margin-top-big'>
                <h4 className='heading--secondary'>
                    Subtotal for ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h4>
                <h1 className='heading--secondary'>
                    ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                </h1>
                <div
                    type='button'
                    className='btn--main'
                    style={{
                        'zIndex': '10'
                    }}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                 >
                    Proceed to Checkout
                </div>
            </div>

        </div>

    )
}

export default CartScreen
