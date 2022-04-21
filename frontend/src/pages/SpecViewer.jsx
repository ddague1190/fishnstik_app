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

    }, [dispatch, id, image])


    return (
        <>
            {!image ? (<Loader />) : (
                <div className='overflow-scroll w-full'>
                    <article className="text-center text-blue-800 font-xl font-semibold pt-4">Actual size of product</article>
                    <span className="block text-center text-blue-800 font-light font-sm">(Image might overflow on small screens)</span>

                    <button className='text-gray-500 font-semibold p-4 cursor-pointer' onClick={() => navigate(`/product/${slug}`)}>Go back</button>
                    <img alt={`Product with id ${slug}`} className={`mx-auto min-w-fit`} src={image} width={width} ref={ref} />
                </div>
            )}
        </>
    )
}
