import React, {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './variants.styles.scss';
import Figure from '../figure/figure.component';
import { cartParser } from '../../utils/reduxSelectors';



const MobileVariantsRow = ({product, variant, index}) => {
    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const [qty, setQty] = useState(1);

    const navigate = useNavigate()
    const cart = useSelector(state=>state.cart);

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
        <td className='mobile-variants__image'>
                <div className='mobile-variants__image-wrapper'>
                    <Figure image={variant.image}/>
                </div>
                
                <span className='mobile-variants__price'>${variant.price} ea</span>
        </td>
        <td className='mobile-variants__details'>
            <div>
                <p className='mobile-variants__details--id'>{variant.identifier}</p>
                <p className='mobile-variants__details--description'>{variant.description}</p>
            </div>
        </td>
        <td className='mobile-variants__quantity'>
        <div>
            {variant.countInStock > 0 ? (
            <form  className='u-center-text'>
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
            <button className={`mobile-variants__addtocart ${alreadyInCart ? 'mobile-variants__addtocart--alreadyincart' : ''}`} onClick={()=>addToCartHandler(variant._id)} disabled={variant.countInStock===0}>
                <i class="fas fa-shopping-cart"></i>
            </button>
        </td>
    </tr>
    )
}

const MobileVariants = ({product, className}) => {

  return (
    <table className={`${className} mobile-variants`}>
        <thead>
            <th>Image</th>
            <th>Details</th>
            <th>Quantity</th>
            <th>Add</th>
        </thead>
        <tbody>
            {product.variants.map((variant, index) => (
                <MobileVariantsRow product={product} variant={variant} key={index} />
            ))}
        </tbody>

    </table>
      
  );
};


export default MobileVariants;