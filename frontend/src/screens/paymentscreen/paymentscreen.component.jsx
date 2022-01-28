import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/checkoutsteps/checkoutsteps.component'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../../actions/cartActions'
import './paymentscreen.styles.scss';

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [paymentMethod, setPaymentMethod ] = useState('PayPal or Credit Card')
    if(!shippingAddress.name) {
        navigate('/shipping/')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!shippingAddress.name) {
            navigate('/shipping')
            return

        }
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div className='paymentscreen'>
            <CheckoutSteps step1 step2 step3 />

            <form className='productscreen__form' onSubmit={submitHandler}>
                <input 
                    className='paymentscreen__input'
                    type="checkbox" 
                    id="paypal" 
                    name="paypal"
                    
                />
                <label className='paymentscreen__label' for="paypal">PayPal or Credit Card</label>
                <button className='btn--main u-margin-top-small' type='submit' variant='primary'>
                    Continue
                </button>
            </form>
        </div>
    )
}

export default PaymentScreen
