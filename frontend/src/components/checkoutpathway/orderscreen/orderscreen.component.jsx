import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../utilities/message/message.component";
import Loader from "../../utilities/loader/loader.component";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../../redux/constants/orderConstants";
import AddressBox from "../../utilities/addressbox/addressbox.component";
import CartItem from "../cartitem/cartitem.component";
import "./orderscreen.styles.scss";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/variants";

const OrderScreen = () => {
  const orderId = useParams().id;
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [errorPayPal, setErrorPayPal] = useState("");

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  let { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    if (error?.includes("token")) {
      navigate(`/login?redirect=/order/${orderId}`);
    }
  }, [dispatch, order, orderId, error, successPay, navigate]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='orderscreen'>
      <table className='orderscreen__params u-box-shadow'>
        <tbody classname='u-center-text'>
          <tr>
            <h4>Contact info</h4>
            <span className='u-center-text'>
              <div>{order?.user.email}</div>
              <div>{order?.shippingAddress.phone}</div>
            </span>
          </tr>
          <tr>
            <h4>Shipping to:</h4>
            <AddressBox input={order.shippingAddress} />
          </tr>
          <tr>
            <br />
            {order?.isDelivered ? (
              <Message variant='success'>
                Delivered on {order.deliveredAt}
              </Message>
            ) : order.trackingNumber ? (
              <Message variant='info'>
                {order.shippingService} {order.trackingNumber}
              </Message>
            ) : (
              <Message variant='warning'>Not shipped</Message>
            )}
          </tr>
          <tr>
            <h4>Payment</h4>
            <span> {order.paymentMethod}</span>
          </tr>
          <tr>
            <h4>Instructions:</h4>
            <span>
              {order.instructions ? order.instructions : "None given"}
            </span>
          </tr>
          <tr>
            <br />
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='warning'>Not paid{order.paidAt}</Message>
            )}
          </tr>
        </tbody>
      </table>
      <div className='orderscreen__orderitems'>
        <h2 className='u-center-text'>Order Items</h2>

        <table className='cartitems'>
          <th className='cartitems__header cartitems__header--image'>Image</th>
          <th className='cartitems__header cartitems__header--product'>
            Product
          </th>
          <th className='cartitems__header cartitems__header--changeqty'>
            Qty
          </th>

          {order.orderItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </table>
      </div>
      <div className='orderscreen__ordersummary'>
        <h2 className='ordersummarytable__title'>Order Summary</h2>
        <table className='ordersummarytable'>
          <tbody>
            <tr>
              <td className='u-font-weight-light'>Items price</td>
              <td>${order.itemsPrice}</td>
            </tr>
            <tr>
              <td className='u-font-weight-light'>Shipping price</td>
              <td>${order.shippingPrice}</td>
            </tr>
            <tr>
              <td className='u-font-weight-light'>Tax price</td>
              <td>${order.taxPrice}</td>
            </tr>
            <tr>
              <td className='u-font-weight-light'>Total price</td>
              <td className='u-background-shade-1'>${order.totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className='ordersummary__error'>
          {error && <Message variant='danger'>{error}</Message>}
        </div>
        {!order.isPaid && (
          <div className='paypal'>
            {loadingPay && <Loader />}
            {errorPay && <Message variant='danger'>{errorPay}</Message>}
            {errorPayPal && <Message variant='danger'>{errorPayPal}</Message>}

            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: order.totalPrice,
                        },
                        custom_id: orderId,
                        shipping: {
                          name: {
                            full_name: order.shippingAddress.name,
                          },
                          address: {
                            address_line_1: order.shippingAddress.address,
                            address_line_2: order.shippingAddress.apartment,
                            admin_area_2: order.shippingAddress.city,
                            admin_area_1: order.shippingAddress.state,
                            postal_code: order.shippingAddress.postalCode,
                            country_code: "US",
                          },
                        },
                      },
                    ],
                    application_context: {
                      locale: "us-US",
                      shipping_preference: "SET_PROVIDED_ADDRESS",
                    },
                  });
                }}
                onSuccess={successPaymentHandler}
                onError={(err) => setErrorPayPal(err)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
