import { createStore, combineReducers, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, 
    productDetailsReducer, 
    productReviewCreateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    getSavedAddressesReducer } from './reducers/userReducer';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListyMyReducer, 
} from './reducers/orderReducers';
import { routeReducer } from './reducers/routeReducer';
import { responsiveReducer } from './reducers/responsiveReducers';
import { fishFactReducer } from './reducers/promoReducers';
import { whichLoader } from './reducers/promoReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListyMyReducer,
    keyword: routeReducer,
    savedAddresses: getSavedAddressesReducer,
    dimensions: responsiveReducer,
    fishFact: fishFactReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))


export default store;