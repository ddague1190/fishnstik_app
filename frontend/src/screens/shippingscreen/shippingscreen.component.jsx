import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/checkoutsteps/checkoutsteps.component';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../actions/cartActions';
import { getSavedAddresses } from '../../actions/userActions';
import AddressBox from '../../components/addressbox/addressbox.component';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component'
import './shippingscreen.styles.scss';
import AddressForm from '../../components/addressform/addressform.component';
import { Button } from '../../components/button/button.component';

function ShippingScreen() {

    const {addresses, loading} = useSelector(state => state.savedAddresses)
    
    const [whichHighlighted, setWhichHighlighted] = useState(new Array(10).fill(false))
    const [addNewAddress, setAddNewAddress] = useState(false)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
    const [message, setMessage] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    });

    useEffect(()=> {
        dispatch(getSavedAddresses())
    }, []);

    const selectedAddress = (selected, index) => {
        setFormData(selected);
        setWhichHighlighted(whichHighlighted.map((el, id) => id===index ? true : false)); 
        setMessage('');
    }
    

    const submitHandler = (e) => {
        e.preventDefault()
        if(!formData.name) {
            setMessage('Please select address or add a new one')
            return false
        }
        setMessage('')
        const {name, address, apartment, city, state, postalCode, phone} = formData;
        dispatch(saveShippingAddress({name, address, apartment, city, state, postalCode, phone}))
        navigate('/payment')
    }
    

    const toggleAddressForm = () => {
        setAddNewAddress(!addNewAddress)
        setWhichHighlighted(new Array(10).fill(false))
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

    return (
        <div className='shippingscreen'>
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <CheckoutSteps step1 step2 />
            <h2 className='u-center-text '>Shipping</h2>
            
            {addresses ? (
                !addNewAddress ?  
                    (
                        <div className='shippingscreen__addressform'> 
                            <div className='shippingscreen__oldaddresses'>
                                {oldAddresses}       
                            </div>    
                            <div className='shippingscreen__buttonwrapper u-margin-top-medium'>       
                                <button className='btn--main' onClick={submitHandler} variant='primary'>
                                    Continue
                                </button>
                                <span onClick={toggleAddressForm} className='shippingscreen__optionbutton'>
                                    Send to a different address
                                </span>
                            </div>
                        </div>
                    ) : <AddressForm toggleAddressForm={toggleAddressForm} />
                ) : <AddressForm />
            }

        </div>
    )
}

export default ShippingScreen
