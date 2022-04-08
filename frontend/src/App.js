import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductList from "./components/productpresentation/ProductList";
import ProductDetails from "./components/productpresentation/ProductDetails";
import CartScreen from "./components/checkoutpathway/CartScreen";
import { OrderScreen } from "./components/checkoutpathway/OrderScreen";
import "./sass/App.scss";
import useViewport from "./utils/useViewport";
import { getCategories } from "./redux/actions/productActions";
import LoginScreen from "./components/user/LoginScreen";
import { HomeScreen } from "./components/promotional/HomeScreen";
import AboutUsScreen from "./components/promotional/AboutUs";
import Privacy from "./components/promotional/Privacy";
import Terms from "./components/promotional/Terms";
import RegisterScreen from "./components/user/RegisterScreen";
import ShippingScreen from "./components/checkoutpathway/ShippingScreen";
import PlaceOrder from "./components/checkoutpathway/PlaceOrder";
import ProfileScreen from "./components/user/profile/ProfileScreen";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useViewport();
  const location = useLocation();
  const Page404 = () => {
    return <h3>404 - Not found</h3>;
  };

  return (
    <Routes key={location.pathname}>
      <Route exact path="/" element={<HomeScreen />} />
      <Route path="/products/:url_cat/:url_subcat/" element={<ProductList />} />
      <Route path="/products/:url_cat/" element={<ProductList />} />
      <Route path="/products/" element={<ProductList />} />
      <Route path="/brands/:url_brand/" element={<ProductList />} />
      <Route path="/about" element={<AboutUsScreen />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/order/:id" element={<OrderScreen />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart/:id" element={<CartScreen />} />
      <Route path="/cart/" element={<CartScreen />} />
      <Route path='/' element={<Page404 />} />
    </Routes>
  );
};

export default App;
