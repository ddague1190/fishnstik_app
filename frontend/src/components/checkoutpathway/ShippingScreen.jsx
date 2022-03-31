import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../utilities/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/actions/cartActions";
import { getSavedAddresses, getUserDetails} from "../../redux/actions/userActions";
import AddressBox from "../utilities/addressbox/addressbox.component";
import Loader from "../utilities/loader/loader.component";
import Message from "../utilities/message/message.component";
import { useForm } from "../../utils/useForm";
import AddressForm from "./AddressForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData, setFormData2] = useForm({
    firstName: "",
    lastName: "",
    company: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const [whichHighlighted, setWhichHighlighted] = useState(
    new Array(10).fill(false)
  );
  const [addNewAddress, setAddNewAddress] = useState(false);
  const { addresses } = useSelector((state) => state.savedAddresses);
  const {user} = useSelector(state=>state.userDetails)
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getSavedAddresses());
    dispatch(getUserDetails());
  }, []);

  const selectedAddress = (selected, index) => {
    setFormData(selected);
    setWhichHighlighted(
      whichHighlighted.map((el, id) => (id === index ? true : false))
    );
    setMessage("");
  };

  const submitHandlerForPreSavedAddresses = (e) => {
    e.preventDefault();
    const missingEntries = [];
    Object.keys(formData).forEach((key) => {
      if (
        key != "phone" &&
        key != "email" &&
        key != "company" &&
        key != "apartment"
      ) {
        if (!formData[key]) {
          missingEntries.push(key.toLowerCase());
        }
      }
    });

    if (missingEntries.length > 0) {
      setMessage(`Missing information: ${missingEntries}`);
      return false;
    }

    if (!formData.firstName) {
      setMessage("Please select address or add a new one");
      return false;
    }
    setMessage("");

    dispatch(
      saveShippingAddress({
        ...formData,
      })
    );
    dispatch(savePaymentMethod("PayPal or Credit Card"));
    navigate("/placeorder");
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
    <div className="bg-white">
      <div className="mx-auto max-w-xl pt-10 pb-24 px-4 lg:max-w-7xl lg:px-8">
        {message && <Message variant="danger">{message}</Message>}
        <CheckoutSteps step1="complete" step2="current" />

        <div className="">
          <h1 className="text-3xl mt-16 mb-10 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Shipping
          </h1>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700">
                    Add an additional email to recieve updates (optional):
                  </label>
                  <span className="text-xs block p-2 bg-green -50 w-max rounded-md">(We already have your primary email: {user?.email})</span>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={setFormData}
                      className="block w-full bg-blue-50 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700">
                    Add a phone number (optional):
                  </label>
                  <div className="mt-1">
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      autoComplete="email"
                      value={formData.phone}
                      onChange={setFormData}
                      className="block w-full border-gray-300 bg-blue-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                {addresses ? (
                  !addNewAddress ? (
                    <div className="">
                      <p>Select from previously saved addresses:</p>

                      <div className="">{oldAddresses}</div>
                      <div className="flex gap-5 w-96 items-center">
                        <button
                          onClick={submitHandlerForPreSavedAddresses}
                          type="submit"
                          className=" bg-black text-white border border-transparent rounded-md shadow-sm py-2 px-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                          Continue
                        </button>

                        <span
                          onClick={toggleAddressForm}
                          className=" hover:font-bold cursor-pointer">
                          Send to a different address
                        </span>
                      </div>
                    </div>
                  ) : (
                    <AddressForm
                      setMessage={setMessage}
                      toggleAddressForm={toggleAddressForm}
                      formDataPreSaved={formData}
                    />
                  )
                ) : (
                  <AddressForm
                    hideReturnOption
                    fillWithPreSavedAddress
                    setMessage={setMessage}
                    formDataPreSaved={formData}
                    setFormData2PreSaved={setFormData2}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
