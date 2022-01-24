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
   
    <form className='addaddressform' onSubmit={submitHandler}>
        <div class='input-control'>
            <input 
                class='input-control__input'
                id='name'
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

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='address'
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

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='apartment'
                type='text'
                placeholder='If applicable, enter apartment or suite'
                value={formData.apartment}
                onChange={setFormData}
            />
            <label for='apartment' class='input-control__label'>
                Apartment
            </label>
        </div>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='city'
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

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='state'
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

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='postalcode'
                required
                type='text'
                placeholder='Enter postalCode'
                value={formData.postalCode}
                onChange={setFormData}
            />
            <label for='postalcode' class='input-control__label'>
                Zip code
            </label>
        </div>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='phone'
                type='text'
                placeholder='Attach phone number to this order (optional)'
                value={formData.phone}
                onChange={setFormData}
            />
            <label for='phone' class='input-control__label'>
                Phone
            </label>
        </div>

        <button className='btn--main' type='submit' variant='primary'>
            Continue 
        </button>

        <span onClick={toggleAddressForm} className='cartscreen__optionbutton'>
            Use previously saved address
        </span>
        
    </form>
    
  );
};

export default AddressForm;
