import React, {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './variants.styles.scss';
import Figure from '../figure/figure.component';
import { cartParser } from '../../utils/reduxSelectors';



const VariantRow = ({product, variant}) => {
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const navigate = useNavigate()
    const [qty, setQty] = useState(1);

    const parsedCart = useSelector(cartParser);
    
    useEffect(()=> {
        parsedCart.forEach(({productId, variantId, qty})=>{
            if (productId===product._id && variantId===variant._id) {
                setAlreadyInCart(true);
                setQty(qty);
            }
        })
    }, [parsedCart, product._id, variant._id])

    const addToCartHandler = (variantId) => {
        navigate(`/cart/${product._id}?qty=${qty}&variant=${variantId}`)
    }
    

    return (
        <tr>
        <td className='variants__image'><Figure image={variant.image}/></td>
        <td className='variants__name' >{variant.identifier}</td>
        <td className='variants__price'>${variant.price} ea</td>
        <td className='variants__description'>{variant.description}</td>
        <td className='variants__quantity'>
        <div>
            {variant.countInStock > 0 ? (
            <form  className='u-center-text' >
                <select className='cartform__select u-center-text' value={qty} onChange={(e) => setQty(e.target.value)}>
                {                           
                    [...Array(variant.countInStock).keys()].map((x) => (
                        <option key={x+1} value={x+1}>
                            {x + 1}
                        </option>
                ))
                }
                </select>
            </form>
            ) : <h4>Out of stock</h4> }
        </div>
        </td>
        <td >
            <button className={`variants__addtocart ${alreadyInCart ? 'variants__addtocart--alreadyincart' : ''}`} onClick={()=>addToCartHandler(variant._id)} disabled={variant.countInStock===0}>
                <i class="fas fa-shopping-cart"></i>
            </button>
        </td>
    </tr>
    )
};

const Variants = ({product, className}) => {


  return (
    <table className={`${className} variants`}>
        <thead>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Add</th>
        </thead>
        <tbody>
            {product.variants.map((variant, index) => (
                <VariantRow product={product} variant={variant} key={index} />
            ))}
        </tbody>

    </table>
      
  );
};


export default Variants;