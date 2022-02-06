import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/navigation/header/header.component';
import Footer from './components/navigation/footer/footer.component';
import HomeScreen from './components/promotional/homescreen/homescreen.component';
import ProductScreen from './components/productpresentation/productscreen/productscreen.component';
import CartScreen from './components/checkoutpathway/cartscreen/cartscreen.component';
import LoginScreen from './components/user/loginscreen/loginscreen.component';
import RegisterScreen from './components/user/registerscreen/registerscreen.component';
import ProfileScreen from './components/user/profilescreen/profilescreen.component';
import ShippingScreen from './components/checkoutpathway/shippingscreen/shippingscreen.component';
import PaymentScreen from './components/checkoutpathway/paymentscreen/paymentscreen.component';
import PlaceOrderScreen from './components/checkoutpathway/placeorderscreen/placeorderscreen.component';
import OrderScreen from './components/checkoutpathway/orderscreen/orderscreen.component';
import AboutUsScreen from './components/promotional/aboutusscreen/aboutusscreen.component';
import ProductList from './components/productpresentation/productlist/productlist.component';
import Brands from './components/promotional/brands/brands.component';
import './sass/App.scss';
import useViewport from './utils/useViewport';



const App = () => {
  

  useViewport();



  const Page404 = () => {
    return (
      <h3>404 - Not found</h3>
    );
  };
  
  return (
    <BrowserRouter basename='/'>
      <Header />
        <main className='main'>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>} />
            <Route path='/products/:url_cat/:url_subcat/' element={<ProductList />} />
            <Route path='/products/:url_cat/' element={<ProductList />} />
            <Route path='/products/' element={<ProductList />} />
            <Route path='/brands' element={<Brands />} />
            <Route path='/brands/:url_brand/' element={<ProductList />} />
            <Route path='/aboutus' element={<AboutUsScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart/' element={<CartScreen />} />
            <Route element={<Page404 />} />
          </Routes>
        </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
