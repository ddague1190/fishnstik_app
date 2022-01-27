import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../utils/useForm';
import { saveShippingAddress } from '../../actions/cartActions';
import './addressform.styles.scss';

const AddressForm = ({toggleAddressForm}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useForm({
        name: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    });

    const {name, address, apartment, city, state, postalCode, phone} = formData;

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, address, apartment, city, state, postalCode, phone}))
        navigate('/payment')
    }
    
    return (
    <div className='shippingscreen__addressform'>
        <form className='addaddressform' onSubmit={submitHandler}>
            <div class='input-control addaddressform__name'>
                <input 
                    class='input-control__input'
                    id='name'
                    name='name'
                    required
                    type='text'
                    placeholder='Recipient name or business'
                    value={formData.name}
                    onChange={setFormData}
                />
                <label for='name' class='input-control__label'>
                    Name
                </label>
            </div> 

            <div class='input-control addaddressform__address'>
                <input 
                    class='input-control__input'
                    id='address'
                    name='address'
                    required
                    type='address'
                    placeholder='Enter street address'
                    value={formData.address}
                    onChange={setFormData}
                />
                <label for='address' class='input-control__label'>
                    Street Address
                </label>
            </div> 

            <div class='input-control addaddressform__apartment'>
                <input 
                    class='input-control__input'
                    id='apartment'
                    name='apartment'
                    type='text'
                    placeholder='If applicable, enter apartment or suite'
                    value={formData.apartment}
                    onChange={setFormData}
                />
                <label for='apartment' class='input-control__label'>
                    Apartment
                </label>
            </div>

            <div class='input-control addaddressform__city'>
                <input 
                    class='input-control__input'
                    id='city'
                    name='city'
                    required
                    type='text'
                    placeholder='Enter city'
                    value= {formData.city}
                    onChange={setFormData}
                />
                <label for='city' class='input-control__label'>
                    City
                </label>
            </div>

            <div class='input-control addaddressform__state'>
                <input 
                    class='input-control__input'
                    id='state'
                    name='state'
                    required
                    type='text'
                    placeholder='Enter city'
                    value= {formData.city}
                    onChange={setFormData}
                />
                <label for='state' class='input-control__label'>
                    State
                </label>
            </div>

            <div class='input-control addaddressform__postalCode'>
                <input 
                    class='input-control__input'
                    id='postalcode'
                    name='postalCode'
                    required
                    type='text'
                    placeholder='Enter postalCode'
                    value={formData.postalCode}
                    onChange={setFormData}
                />
                <label for='postalcode' class='input-control__label'>
                    Zip
                </label>
            </div>

            <div class='input-control addaddressform__phone'>
                <input 
                    class='input-control__input'
                    id='phone'
                    name='phone'
                    type='text'
                    placeholder='Attach phone number to this order (optional)'
                    value={formData.phone}
                    onChange={setFormData}
                />
                <label for='phone' class='input-control__label'>
                    Phone
                </label>
            </div>
            
        </form>
        <div className='shippingscreen__buttonwrapper u-margin-top-medium'>
            <button className='btn--main' type='submit' variant='primary'>
                Continue 
            </button>

            <span onClick={toggleAddressForm} className='cartscreen__optionbutton'>
                Use previously saved address
            </span>
        </div>
    </div>
  );
};

export default AddressForm;
