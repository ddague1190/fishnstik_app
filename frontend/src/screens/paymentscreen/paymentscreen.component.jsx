import React, {useState} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formcontainer/formcontainer.component'
import CheckoutSteps from '../../components/checkoutsteps/checkoutsteps.component'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../../actions/cartActions'

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
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' id='paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
