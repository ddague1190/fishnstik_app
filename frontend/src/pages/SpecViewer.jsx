import React from 'react'
import Loader from "../components/utilities/loader/loader.component";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { listProductDetails } from "../redux/actions/productActions";


export const SpecViewer = () => {
    const ref = useRef()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { product: { specWidth: width, specImage: image, slug } } = useSelector(state => state.productDetails)
    const navigate = useNavigate()

    useEffect(() => {
        if (!image) {
            dispatch(listProductDetails(id));
        }
        window.scrollTo(0, 0)

    }, [])


    return (
        <>
            {!image ? (<Loader />) : (
                <div className='overflow-scrollw-full'>
                    <h1 className="text-center text-blue-800">Note: The products are actual-size in this image.</h1>
                    <button className='text-gray-500 font-semibold p-4 cursor-pointer' onClick={() => navigate(`/product/${slug}`)}>Go back</button>
                    <img className='mx-auto' src={image} width={815} ref={ref} styles={{ width: '815px' }} />
                </div>
            )}
        </>
    )
}
