import React, { useState, useEffect } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/formcontainer/formcontainer.component'
import CheckoutSteps from '../../components/checkoutsteps/checkoutsteps.component'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../actions/cartActions'
import { getSavedAddresses } from '../../actions/userActions'
import AddressBox from '../../components/addressbox/addressbox.component';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {addresses, loading} = useSelector(state => state.savedAddresses)
    const [whichHighlighted, setWhichHighlighted] = useState(new Array(10).fill(false))
    const { shippingAddress } = cart
    const [addNewAddress, setAddNewAddress] = useState(false)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [message, setMessage] = useState('')

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [apartment, setApartment] = useState(shippingAddress.apartment)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [phone, setPhone] = useState(shippingAddress.phone)



    useEffect(()=>dispatch(getSavedAddresses()));


    



    const selectedAddress = (selected, index) => {
        setName(selected.name)
        setAddress(selected.address)
        setApartment(selected.apartment)
        setCity(selected.city)
        setState(selected.state)
        setPostalCode(selected.postalCode)
        setPhone(selected.phone)
        setWhichHighlighted(whichHighlighted.map((el, id) => id===index ? true : false))  
        setMessage('') 
    }
    
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(!name) {
            setMessage('Please select address or add a new one')
            return false
        }
        setMessage('')
        dispatch(saveShippingAddress({name, address, apartment, city, state, postalCode, phone}))
        navigate('/payment')
    }
    

    const newAddressHandler = () => {
        setAddNewAddress(!addNewAddress)
        setWhichHighlighted(new Array(10).fill(false))
        setName('')
        setAddress('')
        setApartment('')
        setCity('')
        setState('')
        setPostalCode('')
        setPhone('')   
        setMessage('')
    }

    const oldAddresses = addresses?.map((el, index)=>(
        <AddressBox 
            key={index} 
            index={index} 
            input={el} 
            selectedAddress={selectedAddress}
            highlighted = {whichHighlighted[index]}
        ></AddressBox>
    ))

    oldAddresses?.unshift(<div key='title'>Select from previously used addresses</div>)

    const newAddressForm = (<Form onSubmit={submitHandler}> 
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
        <div className='flex gap3'>
            <Button type='submit' variant='primary' className='my-3'>
                Continue 
            </Button>
        {addresses &&
            <span onClick={newAddressHandler} className='extrabox' >
                Use address on file
            </span>
        }
        </div>

</Form>)




    return (
        <div>
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            {addresses ? (
                <div>
                {addNewAddress ? '' : oldAddresses}

                {!addNewAddress &&  
                    <div className='flex gap3'>                    
                        <Button onClick={submitHandler} variant='primary' className='my-3'>
                            Continue
                        </Button>
                        <span onClick={newAddressHandler} className='extrabox'>
                            Send to a different address
                        </span>
                    </div>
                }

                {addNewAddress ? newAddressForm : ''}
                </div>
            
            ) :
            
            newAddressForm
            
            }

            
        </FormContainer>
        </div>
    )
}

export default ShippingScreen
