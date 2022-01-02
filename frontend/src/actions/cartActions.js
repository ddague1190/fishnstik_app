import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'





export const addToCart = (id, variantId, qty) => async (dispatch, getState) => {

    const {data} = await axios.get(`/api/products/${id}`);
    
 
    // Find index of correct variant within product.variants list

    let index = data.variants.findIndex( el => el['_id'] === variantId)
    


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            variantId,
            name: data.name,
            variantDescription: data.variants[index].description,
            image: data.variants[index].image,
            price: data.variants[index].price,
            countInStock: data.variants[index].countInStock,
            qty
        }            
    }) 

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId, variantId) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            productId,
            variantId
        } 
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data, 
    })

}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data, 
    })

}