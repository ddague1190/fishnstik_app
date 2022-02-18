import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../utilities/checkoutsteps/checkoutsteps.component";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import { getSavedAddresses } from "../../../redux/actions/userActions";
import AddressBox from "../../utilities/addressbox/addressbox.component";
import Loader from "../../utilities/loader/loader.component";
import Message from "../../utilities/message/message.component";
import "./shippingscreen.styles.scss";
import AddressForm from "../addressform/addressform.component";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";
function ShippingScreen() {
  const { addresses, loading } = useSelector((state) => state.savedAddresses);

  const [whichHighlighted, setWhichHighlighted] = useState(
    new Array(10).fill(false)
  );
  const [addNewAddress, setAddNewAddress] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getSavedAddresses());
  }, []);

  const selectedAddress = (selected, index) => {
    setFormData(selected);
    setWhichHighlighted(
      whichHighlighted.map((el, id) => (id === index ? true : false))
    );
    setMessage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage("Please select address or add a new one");
      return false;
    }
    setMessage("");
    const { name, address, apartment, city, state, postalCode, phone } =
      formData;
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

  const toggleAddressForm = () => {
    setAddNewAddress(!addNewAddress);
    setWhichHighlighted(new Array(10).fill(false));
  };

  const oldAddresses = addresses?.map((el, index) => (
    <AddressBox
      key={index}
      index={index}
      input={el}
      selectedAddress={selectedAddress}
      highlighted={whichHighlighted[index]}></AddressBox>
  ));

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='in'
      exit='out'
      className='shippingscreen'>
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <CheckoutSteps step1 step2 />
      <h2 className='u-center-text u-margin-bottom-medium'>Shipping</h2>

      {addresses ? (
        !addNewAddress ? (
          <div className='shippingscreen__addressform'>
            <div className='shippingscreen__oldaddresses'>{oldAddresses}</div>
            <div className='shippingscreen__buttonwrapper u-margin-top-medium'>
              <button className='button' onClick={submitHandler}>
                Continue
              </button>
              <span
                onClick={toggleAddressForm}
                className='shippingscreen__optionbutton'>
                Send to a different address
              </span>
            </div>
          </div>
        ) : (
          <AddressForm toggleAddressForm={toggleAddressForm} />
        )
      ) : (
        <AddressForm />
      )}
    </motion.div>
  );
}

export default ShippingScreen;
