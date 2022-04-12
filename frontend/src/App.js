import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartScreen from "./pages/CartScreen";
import "./sass/App.scss";
import useViewport from "./utils/useViewport";
import { getCategories } from "./redux/actions/productActions";
import LoginScreen from "./pages/LoginScreen";
import { HomeScreen } from "./pages/HomeScreen";
import AboutUsScreen from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ShippingScreen from "./pages/ShippingScreen";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/profile/ProfileScreen";


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
