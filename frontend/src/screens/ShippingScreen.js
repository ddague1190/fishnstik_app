import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
 
function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [apartment, setApartment] = useState(shippingAddress.apartment)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [phone, setPhone] = useState(shippingAddress.phone)



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, address, apartment, city, state, postalCode, phone}))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
           <Form onSubmit={submitHandler}>
                
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Recipient name or business'
                        value={name ? name : ''}
                        onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter street address'
                        value={address ? address : ''}
                        onChange={(e)=>setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='apartment'>
                    <Form.Label>Apartment</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='If applicable, enter apartment or suite'
                        value={apartment ? apartment : ''}
                        onChange={(e)=>setApartment(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value= {city ? city : ''}
                        onChange={(e)=>setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter state'
                        value={state ? state : ''}
                        onChange={(e)=>setState(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postalCode'
                        value={postalCode ? postalCode : ''}
                        onChange={(e)=>setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Not required but helpful for sharing any information related to your order'
                        value={phone ? phone : ''}
                        onChange={(e)=>setPhone(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Continue 
                </Button>
           </Form>
        </FormContainer>
    )
}

export default ShippingScreen
