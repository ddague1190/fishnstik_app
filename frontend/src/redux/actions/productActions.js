import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET
} from '../constants/productConstants';

import axiosInstance from '../axiosInstance';
import { resetKeyword } from './routeActions';


export const listProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products/${keyword}`);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const listCategorizedProducts = (category, subcategory='', keyword='') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products/${category}/${subcategory}${subcategory && '/'}${keyword}`);


        dispatch(resetKeyword());

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const listProductsByBrand = (brand, search='') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/brands/${brand}/${search}`);

        dispatch(resetKeyword());

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        const {data} = await axiosInstance.post(`/api/products/${2}/reviews`,
            review
        );


        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
         
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }
}