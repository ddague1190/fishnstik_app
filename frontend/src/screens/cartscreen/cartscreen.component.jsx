import React, {useEffect} from 'react';
import { Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
        <div className='cartscreen u-margin-top-medium u-box-shadow'>
            <h2 className='u-center-text u-margin-bottom-medium'>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                   <Message variant='info'>
                       Your cart is empty <Link to='/'>Go Back</Link>
                   </Message>
               ) : (

                   <table className='cartitems'>
                        <th className='cartitems__header cartitems__header--image'>Image</th>
                        <th className='cartitems__header cartitems__header--product'>Product</th>
                        <th className='cartitems__header cartitems__header--changeqty'>Qty</th>

                        {cartItems.map((item, index) => (
                            <CartItem key={index} item={item} />
                            
                        ))}
                    </table>
                )}
            <div className='cartitems__subtotal u-margin-top-big'>
                <h4 className='heading--secondary'>
                    Subtotal for ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h4>
                <h1 className='heading--secondary'>
                    ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                </h1>
                <button
                    type='button'
                    className='btn--main'
                    style={{
                        'zIndex': '10'
                    }}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                 >
                    Proceed to Checkout
                </button>
            </div>

        </div>

    )
}

export default CartScreen
