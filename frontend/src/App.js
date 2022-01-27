import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomeScreen from './screens/homescreen/homescreen.component';
import ProductScreen from './screens/productscreen/productscreen.component';
import CartScreen from './screens/cartscreen/cartscreen.component';
import LoginScreen from './screens/loginscreen/loginscreen.component';
import RegisterScreen from './screens/registerscreen/registerscreen.component';
import ProfileScreen from './screens/profilescreen/profilescreen.component';
import ShippingScreen from './screens/shippingscreen/shippingscreen.component';
import PaymentScreen from './screens/paymentscreen/paymentscreen.component';
import PlaceOrderScreen from './screens/placeorderscreen/placeorderscreen.component';
import OrderScreen from './screens/orderscreen/orderscreen.component';
import AboutUsScreen from './screens/aboutusscreen/aboutusscreen.component';
import ProductList from './components/productlist/productlist.component';
import OtherPage from './components/otherpage/otherpage.component';
import './sass/App.scss';




const App = () => {
  
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
            <Route path='/products/:url_cat/:url_subcat' element={<ProductList />} />
            <Route path='/products/:url_cat/' element={<ProductList />} />
            <Route path='/products/' element={<ProductList />} />
            <Route path='/other' element={<OtherPage />} />
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
