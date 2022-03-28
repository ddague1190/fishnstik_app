import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utilities/loader/loader.component";
import Message from "../utilities/message/message.component";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon as XIconOutline,
} from "@heroicons/react/outline";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon as XIconSolid,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CartScreen() {
  const [loading, setLoading] = useState(true);
  const productId = useParams().id;
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [cartItems]);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };


  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)
  const shippingprice = Number(5.00)
  const taxprice = Number(subtotal*.07).toFixed(2)
  const grandtotal=(Number(subtotal)+Number(taxprice)+Number(shippingprice)).toFixed(2)

  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : cartItems.length === 0 ? (
        <Message variant="info">
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {cartItems.map((product, productIdx) => (
                  <li key={productIdx} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-md object-center sm:w-48 sm:h-48 object-contain"
                      />
                    </div>

                    <div className="ml-2 flex-1 flex flex-col justify-between sm:ml-2">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/product/${product.slug}`}
                                className="font-medium text-gray-700 hover:text-gray-800">
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            {product.type && (
                              <p className="ml-4 pl-4 text-xs border-l border-gray-200 text-gray-500">
                                Type: {product.type}
                              </p>
                            )}
                            {product.material && (
                              <p className="ml-4 pl-4 border-l text-xs border-gray-200 text-gray-500">
                                Material: {product.material}
                              </p>
                            )}
                            {product.pack && (
                              <p className="ml-4 pl-4 text-xs border-l border-gray-200 text-gray-500">
                                Pack: {product.pack}
                              </p>
                            )}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 flex items-center gap-5 rounded-md bg-slate-100 max-w-fit py-1 px-2" >
                          <div className="text-lg bg-white border-2 max-w-fit px-3 text-center">
                            {product.qty}
                          </div>
                          <div className="flex gap-5 mt-2">
                            <i
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    ...product,
                                    qty: product.qty + 1,
                                  })
                                );
                              }}
                              className="font-bold fa-solid fa-plus"></i>
                            <i
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    ...product,
                                    qty: product.qty - 1,
                                  })
                                );
                              }}
                              className="fa-solid fa-minus"></i>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  removeFromCart(
                                    product.productId,
                                    product.variantId
                                  )
                                )
                              }
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Remove</span>
                              <XIconSolid
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {product.countInStock > 0 ? (
                          <CheckIcon
                            className="flex-shrink-0 h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ClockIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        <span>
                          {product.countInStock > 0
                            ? "In stock"
                            : `Ships in ${product.leadTime} week${
                                product.leadTime > 0 ? "s" : ""
                              }`}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">{subtotal}</dd>
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
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
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
                  <dd className="text-sm font-medium text-gray-900">${taxprice}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    $
                    {grandtotal}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={checkoutHandler}
                  type="submit"
                  className="w-full bg-black text-white border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                  Checkout
                </button>
              </div>
            </section>
          </form>
        </main>
      )}
    </div>
  );
}
