import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../utilities/checkoutsteps/checkoutsteps.component";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../../redux/actions/cartActions";
import "./paymentscreen.styles.scss";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal or Credit Card");

  useEffect(() => {
    if (!shippingAddress) {
      console.log("no address");
      navigate("/shipping/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!shippingAddress.name) {
      navigate("/shipping");
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='in'
      exit='out'
      className='paymentscreen'>
      <CheckoutSteps step1 step2 step3 />

      <form className='productscreen__form' onSubmit={submitHandler}>
        <input
          className='paymentscreen__input'
          type='checkbox'
          id='paypal'
          name='paypal'
        />
        <label className='paymentscreen__label' for='paypal'>
          PayPal or Credit Card
        </label>
        <button className='button' type='submit' variant='primary'>
          Continue
        </button>
      </form>
    </motion.div>
  );
}

export default PaymentScreen;
