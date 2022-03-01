import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../utilities/message/message.component";
import CheckoutSteps from "../../utilities/checkoutsteps/checkoutsteps.component";
import { logout } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../../redux/constants/orderConstants";
import AddressBox from "../../utilities/addressbox/addressbox.component";
import CartItem from "../cartitem/cartitem.component";
import "./placeorderscreen.styles.scss";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";

const PlaceOrderScreen = () => {
  const orderCreate = useSelector((state) => state.orderCreate);
  let { order, error, success } = orderCreate;
  const [instructions, setInstructions] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  console.log(cart.shippingAddress);

  useEffect(() => {
    if (!cart.shippingAddress) {
      console.log("noaddres");
      navigate("/shipping/");
    } else if (cart.cartItems.length === 0) {
      navigate("/");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    } else if (error?.includes("token not valid")) {
      dispatch(logout());
      navigate("/login/");
    }
  }, [error, success, dispatch, navigate, cart]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        instructions: instructions,
      })
    );
  };
  return (
    <div className='placeorderscreen__container'>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className='placeorderscreen'>
        <div className='placeorderscreen__paramspanel'>
          <div className='placeorderscreen__paramspanel-content'>
            <h3>Shipping to:</h3>
            <AddressBox
              className='placeorderscreen__address'
              input={cart.shippingAddress}
            />
            <h3>Payment Method</h3>
            <p>{cart.paymentMethod}</p>
          </div>
        </div>
        <div className='placeorderscreen__cartitemspanel'>
          {cart.cartItems.length === 0 ? (
            <Message variant='info'>Your cart is empty</Message>
          ) : (
            <div className='cartitems-container'>
              <h2 className='cartitems-container__title'>Items in this order</h2>
              {cart.cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          )}
        </div>
        <div className='placeorderscreen__ordersummarypanel'>
          <h2 className='ordersummarytable__title'>Order Summary</h2>
          <table className='ordersummarytable'>
            <tbody>
              <tr>
                <td className='u-font-weight-light'>Items price</td>
                <td>${cart.itemsPrice}</td>
              </tr>
              <tr>
                <td className='u-font-weight-light'>Shipping price</td>
                <td>${cart.itemsPrice}</td>
              </tr>
              <tr>
                <td className='u-font-weight-light'>Tax price</td>
                <td>${cart.taxPrice}</td>
              </tr>
              <tr>
                <td className='u-font-weight-light'>Total price</td>
                <td className=''>${cart.totalPrice}</td>
              </tr>
            </tbody>
          </table>

          <div className='ordersummary__error'>
            {error && <Message variant='danger'>{error}</Message>}
          </div>

          <button
            className={`button ${
              cart.cartItems.length === 0 ? "button--disable" : ""
            }`}
            onClick={placeOrder}>
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
