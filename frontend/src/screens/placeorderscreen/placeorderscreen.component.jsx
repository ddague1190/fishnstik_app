import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/message/message.component';
import CheckoutSteps from '../../components/checkoutsteps/checkoutsteps.component';
import { logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import AddressBox from '../../components/addressbox/addressbox.component';
import CartItem from '../../components/cartitem/cartitem.component';
import './placeorderscreen.styles.scss';


function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate);
    let {order, error, success} = orderCreate;
    const [instructions, setInstructions] = useState('');
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const cart = useSelector(state => state.cart);


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
        else if(!cart.shippingAddress.name) {
            navigate('/shipping/')
        }
        else if(!cart.paymentMethod) {
            navigate('/payment');
        }
        else if(success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }

        else if (error?.includes('token not valid')) {
            
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
    };
    return (
        <div className='placeorderscreen__container'>

            <CheckoutSteps step1 step2 step3 step4 />

            <div className='placeorderscreen'>
                <table className='placeorderscreen__paramspanel'>
                    <tbody className='u-center-text'>
                        <tr>
                            <h3>Shipping to:</h3>
                            
                            <AddressBox input={cart.shippingAddress} />
                        </tr>
                        <tr>
                            <h3>Payment Method</h3>
                            <p>
                                {cart.paymentMethod}
                            </p>
                        </tr>
                        <tr>
                            <h3>Instructions</h3>
                            <div class='input-control'>
                                <input 
                                    class='input-control__input'
                                    id='instructions'
                                    type='text'
                                    required
                                    placeholder="e.g. Need it yesterday"
                                    value={instructions}
                                    onChange={(e)=>setInstructions(e.target.value)}
                                />
                                <label for='instructions' class='input-control__label'>
                                    Instructions(optional)
                                </label>
                            </div>
                        </tr>
                    </tbody>
                </table>
                <div className='placeorderscreen__cartitemspanel'>
                    <h2 className='u-center-text u-margin-top-medium u-margin-bottom-small'>Order Items</h2>
                {cart.cartItems.length === 0 ? 
                            <Message variant='info'>Your cart is empty</Message> :
                                (   
                            <table className='cartitems'>
                                <th className='cartitems__header cartitems__header--image'>Image</th>
                                <th className='cartitems__header cartitems__header--product'>Product</th>
                                <th className='cartitems__header cartitems__header--changeqty'>Qty</th>

                                {cart.cartItems.map((item, index) => (
                                    <CartItem key={index} item={item} />
                                
                                ))}
                            </table>
                )}
                </div>
                <div className='placeorderscreen__ordersummarypanel'>
                    <h2 className='ordersummarytable__title'>Order Summary</h2>
                    <table className='ordersummarytable'>
                        <tbody>
                            <tr>
                                <td className='u-font-weight-light'>Items price</td>
                                <td >${cart.itemsPrice}</td>
                            </tr>
                            <tr>
                                <td className='u-font-weight-light'>Shipping price</td>
                                <td>${cart.itemsPrice}</td>
                            </tr>
                            <tr>
                                <td className='u-font-weight-light'>Tax price</td>
                                <td>${cart.taxPrice}</td>
                            </tr>
                            <tr>
                                <td className='u-font-weight-light'>Total price</td>
                                <td className='u-background-shade-1'>${cart.totalPrice}</td>
                            </tr>
                        </tbody>       
                    </table>

                    <div className='ordersummary__error'>
                        {error && <Message variant='danger'>{error}</Message>}
                    </div>

                    <button 
                        className={`btn--main ${cart.cartItems.length === 0 ? 'btn--main--disable' : ''}`}
                        onClick={placeOrder}
                    >
                        Place order
                    </button>
                </div>
            </div>
        </div>
            
    )
}

export default PlaceOrderScreen
