import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../../utils/useForm";
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import "./addressform.styles.scss";

const AddressForm = ({ toggleAddressForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useForm({
    name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const { name, address, apartment, city, state, postalCode, phone } = formData;

  const submitHandler = () => {
    dispatch(
      saveShippingAddress({
        name,
        address,
        apartment,
        city,
        state,
        postalCode,
        phone,
      })
    );
    navigate("/payment");
  };

  return (
    <div className='shippingscreen__addressform'>
      <form className='addaddressform' onSubmit={submitHandler}>
        <div className='input-control addaddressform__name'>
          <input
            className='input-control__input'
            id='name'
            name='name'
            required
            type='text'
            placeholder='Recipient name or business'
            value={formData.name}
            onChange={setFormData}
          />
          <label htmlFor='name' className='input-control__label'>
            Name
          </label>
        </div>

        <div className='input-control addaddressform__address'>
          <input
            className='input-control__input'
            id='address'
            name='address'
            required
            type='address'
            placeholder='Enter street address'
            value={formData.address}
            onChange={setFormData}
          />
          <label htmlFor='address' className='input-control__label'>
            Street Address
          </label>
        </div>

        <div className='input-control addaddressform__apartment'>
          <input
            className='input-control__input'
            id='apartment'
            name='apartment'
            type='text'
            placeholder='If applicable, enter apartment or suite'
            value={formData.apartment}
            onChange={setFormData}
          />
          <label htmlFor='apartment' className='input-control__label'>
            Apartment
          </label>
        </div>

        <div className='input-control addaddressform__city'>
          <input
            className='input-control__input'
            id='city'
            name='city'
            required
            type='text'
            placeholder='Enter city'
            value={formData.city}
            onChange={setFormData}
          />
          <label htmlFor='city' className='input-control__label'>
            City
          </label>
        </div>

        <div className='input-control addaddressform__state'>
          <input
            className='input-control__input'
            id='state'
            name='state'
            required
            type='text'
            placeholder='Enter state'
            value={formData.state}
            onChange={setFormData}
          />
          <label htmlFor='state' className='input-control__label'>
            State
          </label>
        </div>

        <div className='input-control addaddressform__postalCode'>
          <input
            className='input-control__input'
            id='postalcode'
            name='postalCode'
            required
            type='text'
            placeholder='Enter postalCode'
            value={formData.postalCode}
            onChange={setFormData}
          />
          <label htmlFor='postalcode' className='input-control__label'>
            Zip
          </label>
        </div>

        <div className='input-control addaddressform__phone'>
          <input
            className='input-control__input'
            id='phone'
            name='phone'
            type='text'
            placeholder='Attach phone number to this order (optional)'
            value={formData.phone}
            onChange={setFormData}
          />
          <label htmlFor='phone' className='input-control__label'>
            Phone
          </label>
        </div>
      </form>
      <div className='shippingscreen__buttonwrapper u-margin-top-medium'>
        <button
          onClick={submitHandler}
          className='btn--main'
          type='submit'
          variant='primary'>
          Continue
        </button>

        <span
          onClick={toggleAddressForm}
          className='shippingscreen__optionbutton'>
          Use previously saved address
        </span>
      </div>
    </div>
  );
};

export default AddressForm;
