import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../utilities/Message";
import Loader from "../utilities/loader/loader.component";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";
import AddressBox from "../utilities/addressbox/addressbox.component";
import { motion } from "framer-motion";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

export const OrderScreen = () => {
  const [errorPayPal, setErrorPayPal] = useState("");
  const [openPay, setOpenPay] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [orderItems, setOrderItems] = useState({ ready: [], notReady: [] });
  const orderId = useParams().id;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = useSelector((state) => state.orderPay);
  console.log(order);

  useEffect(() => {}, []);

  useEffect(() => {
    if (order) categorizeByReady();
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

  const categorizeByReady = () => {
    const ready = [];
    const notReady = [];
    order.orderItems.map((item) => {
      if (item.readyToShip) {
        ready.push(item);
      } else notReady.push(item);
    });

    setOrderItems({ ready: ready, notReady: notReady });
  };

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

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl mb-5 font-extrabold tracking-tight text-gray-900">
          Your Order
        </h1>
        <h3 className="">
          <span className="font-semibold text-sm text-gray-500">
            Date created:
          </span>{" "}
          {order.createdAt}{" "}
        </h3>
        <div className="flex flex-row w-max gap-2">
          <span className="font-semibold text-sm text-gray-500">Address:</span>{" "}
          <AddressBox input={order.shippingAddress} />
        </div>
        <div className="flex flex-col md:flex-row my-10 gap-2">
          <div className="w-full border-2 p-2">
            <p className="text-lg font-semibold  text-gray-700">
              Shipments for this order:
            </p>
          </div>

          <div className="w-full  border-2 p-2">
            <p className="text-lg font-semibold  text-gray-700">
              Payments for this order:
            </p>
          </div>
        </div>
        {orderItems["ready"].length > 0 && (
          <div className="mt-12">
            <h2 className="sr-only">Items in your shopping cart</h2>
            <div className="mb-10">
              <p className="text-lg font-semibold  text-gray-700">
                We have the following items ready for shipment.
              </p>
            </div>

            <ul
              role="list"
              className="relative border-t border-b border-gray-200 divide-y divide-gray-200 bg-green-50">
              {orderItems["ready"].map((product, index) => (
                <li key={index} className="flex py-6 sm:py-2">
                  <div className="flex-shrink-0">
                    <img
                      src={product.variantInfo.image}
                      alt={product.productInfo.name}
                      className="w-24 h-24 rounded-lg object-center object-contain sm:w-20 sm:h-12"
                    />
                  </div>

                  <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <Link
                              to={`/product/${product.productInfo.slug}`}
                              className="font-medium text-gray-700 hover:text-gray-800">
                              {product.productInfo.name}
                            </Link>
                          </h3>

                          {product.variantInfo.title ? (
                            <p className="mt-1 text-sm text-gray-500">
                              {product.variantInfo.title}
                            </p>
                          ) : null}
                          {product.variantInfo.type &&
                          product.variantInfo.type !=
                            product.variantInfo.title ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.title}
                            </p>
                          ) : null}
                          {product.variantInfo.material ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.material}
                            </p>
                          ) : null}
                          {product.variantInfo.pack ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.pack}
                            </p>
                          ) : null}
                        </div>
                        <div className="mt-4 flex items-center sm:block sm:top-0 sm:mt-0">
                          <div className="text-sm font-medium text-gray-900 text-right">
                            <span className="text-xs font-normal">
                              Per pack:{" "}
                            </span>
                            ${product.variantInfo.price}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                        <div className="flex flex-row gap-2 items-center">
                          <span className="text-xs">Qty ordered:</span>
                          <span>{product.qty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {!openPay ? (
              <button
                onClick={setOpenPay.bind(null, true)}
                className="w-full my-3 bg-blue-800 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-800">
                Pay to ship{" "}
                <i
                  className="fa fa-asterisk -translate-y-1.5 text-xs"
                  aria-hidden="true"></i>
              </button>
            ) : (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-50 rounded-b-md w-full  flex flex-col md:flex-row gap-2 py-6 px-2 items-center">
                <section aria-labelledby="summary-heading" className="w-full">
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-gray-900">
                    Order summary
                  </h2>

                  <dl className="mt-6 space-y-4">
                    <div className="border-t border-gray-200  pt-4 flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${order.totalPrice}
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a
                          href="#"
                          className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Learn more about how shipping is calculated
                          </span>
                          <QuestionMarkCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${order.totalPrice > 100 ? 0 : 10}
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        <a
                          href="#"
                          className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Learn more about how tax is calculated
                          </span>
                          <QuestionMarkCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${(order.totalPrice * 0.07).toFixed(2)}
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        $
                        {Number(order.totalPrice) +
                          Number((order.totalPrice * 0.07).toFixed(2)) +
                          Number(order.totalPrice > 100 ? 0 : 10)}
                      </dd>
                    </div>
                  </dl>
                </section>
                <div className="w-3/4 md:w-full ">
                  {!order.isPaid && (
                    <div className="paypal px-6 pt-6 md:pt-0">
                      {loadingPay && <Loader />}
                      {errorPay && (
                        <Message variant="danger">{errorPay}</Message>
                      )}
                      {errorPayPal && (
                        <Message variant="danger">{errorPayPal}</Message>
                      )}

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
                                      full_name:
                                        order.shippingAddress.firstName +
                                        order.shippingAddress.lastName,
                                    },
                                    address: {
                                      address_line_1:
                                        order.shippingAddress.streetAddress,
                                      address_line_2:
                                        order.shippingAddress.apartment,
                                      admin_area_2: order.shippingAddress.city,
                                      admin_area_1: order.shippingAddress.state,
                                      postal_code:
                                        order.shippingAddress.postalCode,
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
              </motion.div>
            )}
          </div>
        )}

        {orderItems["notReady"].length > 0 && (
          <div className="mt-12">
            <h2 className="sr-only">Items in your shopping cart</h2>
            <div className="mb-10">
              <p className="text-lg font-semibold  text-gray-700">
                The following special order or custom items are still in
                process:
              </p>
            </div>

            <ul
              role="list"
              className="relative border-t border-b border-gray-200 divide-y divide-gray-200 bg-red-50">
              {orderItems["notReady"].map((product, index) => (
                <li key={index} className="flex py-6 sm:py-2">
                  <div className="flex-shrink-0">
                    <img
                      src={product.variantInfo.image}
                      alt={product.productInfo.name}
                      className="w-24 h-24 rounded-lg object-center object-contain sm:w-20 sm:h-12"
                    />
                  </div>

                  <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <Link
                              to={`/product/${product.productInfo.slug}`}
                              className="font-medium text-gray-700 hover:text-gray-800">
                              {product.productInfo.name}
                            </Link>
                          </h3>

                          {product.variantInfo.title ? (
                            <p className="mt-1 text-sm text-gray-500">
                              {product.variantInfo.title}
                            </p>
                          ) : null}
                          {product.variantInfo.type &&
                          product.variantInfo.type !=
                            product.variantInfo.title ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.title}
                            </p>
                          ) : null}
                          {product.variantInfo.material ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.material}
                            </p>
                          ) : null}
                          {product.variantInfo.pack ? (
                            <p className="mt-1 text-sm text-gray-500">
                              Type: {product.variantInfo.pack}
                            </p>
                          ) : null}
                        </div>
                        <div className="mt-4 flex items-center sm:block sm:top-0 sm:mt-0">
                          <div className="text-sm font-medium text-gray-900 text-right">
                            <span className="text-xs font-normal">
                              Per pack:{" "}
                            </span>
                            ${product.variantInfo.price}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                        <div className="flex flex-row gap-2 items-center">
                          <span className="text-xs">Qty ordered:</span>
                          <span>{product.qty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h1 className="mt-10 text-sm text-gray-500 sm:px-5">
          <i
            className="fa fa-asterisk -translate-y-1.5 text-xs"
            aria-hidden="true"></i>{" "}
          We currently have implemented a policy of accepting payment for items
          only when they are ready to ship. If you have items which are custom
          or special order, you have the option of waiting and shipping all
          items together or paying for items as they become ready to ship.
        </h1>
      </div>
    </div>
  );
};
